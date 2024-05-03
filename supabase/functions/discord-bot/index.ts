import { json, serve, validateRequest } from 'https://deno.land/x/sift@0.6.0/mod.ts';
import nacl from 'https://cdn.skypack.dev/tweetnacl@v1.0.3?dts';

enum DiscordCommandType {
  Ping = 1,
  ApplicationCommand = 2,
}

serve({
  '/discord-bot': home,
});

async function home(request: Request) {
  const { error } = await validateRequest(request, {
    POST: {
      headers: ['X-Signature-Ed25519', 'X-Signature-Timestamp'],
    },
  });
  if (error) {
    return json({ error: error.message }, { status: error.status });
  }

  const { valid, body } = await verifySignature(request);
  if (!valid) {
    return json({ error: 'Invalid request' }, { status: 401 });
  }

  const { type, token, application_id, data = { options: [] } } = JSON.parse(body);

  if (type === DiscordCommandType.Ping) {
    return json({ type: 1 });
  }

  if (type === DiscordCommandType.ApplicationCommand) {
    // Send immediate response
    await sendInitialResponse(token, application_id);

    const { value } = data.options.find(
      (option: { name: string; value: string }) => option.name === 'query'
    );

    // Perform the vector search and update the response
    fetchVectorSearchAndUpdateResponse(value, token, application_id);

    // Return a deferred response type (type 5)
    return json({ type: 5 });
  }

  return json({ error: 'Bad request' }, { status: 400 });
}

/** Fetch vector search results and update the response */
async function fetchVectorSearchAndUpdateResponse(query: string, token: string, applicationId: string) {
  const jsonResponse = await fetch(`https://btpoufammgplpmrwmwst.supabase.co/functions/v1/vector-search?query=${query}`, {
    headers: {
      Authorization: `Bearer ${Deno.env.get('annon_key')}`,
      method: 'POST',
      'Content-Type': 'application/json',
    },
  });
  const textResponse = await jsonResponse.text();

  // Update the initial response
  await fetch(`https://discord.com/api/v8/webhooks/${applicationId}/${token}/messages/@original`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${Deno.env.get('DISCORD_BOT_TOKEN')}`
    },
    body: JSON.stringify({
      content: textResponse,
    }),
  });
}

/** Send an immediate response to Discord */
async function sendInitialResponse(token: string, applicationId: string) {
  await fetch(`https://discord.com/api/v8/webhooks/${applicationId}/${token}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${Deno.env.get('DISCORD_BOT_TOKEN')}`
    },
    body: JSON.stringify({
      type: 4,
      data: {
        content: "Processing your request...",
      },
    }),
  });
}

/** Verify whether the request is coming from Discord. */
async function verifySignature(request: Request): Promise<{ valid: boolean; body: string }> {
  const PUBLIC_KEY = Deno.env.get('DISCORD_PUBLIC_KEY')!
  // Discord sends these headers with every request.
  const signature = request.headers.get('X-Signature-Ed25519')!
  const timestamp = request.headers.get('X-Signature-Timestamp')!
  const body = await request.text()
  const valid = nacl.sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexToUint8Array(signature),
    hexToUint8Array(PUBLIC_KEY)
  )

  return { valid, body }
}

/** Converts a hexadecimal string to Uint8Array. */
function hexToUint8Array(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)!.map((val) => parseInt(val, 16)))
}