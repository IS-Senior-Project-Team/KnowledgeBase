if [ -f .env ]; then
    export $(cat .env | xargs)
fi

curl -X POST \
-H 'Content-Type: application/json' \
-H "Authorization: Bot $BOT_TOKEN" \
-d '{"name":"ask","description":"Ask a question about the class","options":[{"name":"query","description":"The question you are asking","type":3,"required":true}]}' \
"https://discord.com/api/v8/applications/$CLIENT_ID/commands"