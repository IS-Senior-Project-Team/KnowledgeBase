# Getting Started with GitHub Desktop and Best Practices for Web App Development

This guide will walk you through the setup and usage of GitHub Desktop, including steps on securing API keys in Node.js and Next.js applications, deploying a Yarn-based web application to Vercel, and managing Yarn/npm installations on both macOS and Windows.

## 1. Installing GitHub Desktop

### For macOS:
1. Go to the [GitHub Desktop download page](https://desktop.github.com/).
2. Click on the "Download for macOS" button.
3. Once the download is complete, open the `.dmg` file and drag the GitHub Desktop application to your Applications folder.

### For Windows:
1. Visit the [GitHub Desktop download page](https://desktop.github.com/).
2. Click on "Download for Windows".
3. After downloading, run the `.exe` file and follow the installation instructions.

## 2. Setting Up GitHub Desktop
1. Open GitHub Desktop.
2. Sign in with your GitHub account credentials.
3. Configure Git by setting your name and email address in Preferences. This is important for commit history.

## 3. Using GitHub Desktop
1. Clone a repository by selecting `File` > `Clone Repository` and choose the repo from your list or specify a URL.
2. Make changes in your local editor.
3. Commit your changes within GitHub Desktop (write a message and click on "Commit to main").
4. Push your changes to GitHub by clicking “Push origin”.

## 4. Securing API Keys in Node.js or Next.js
To prevent API keys from leaking:

### Environment Variables:
- Use environment variables to store sensitive keys. In Node.js and Next.js, you can create a `.env` file in the root of your project to store your variables.

### Using `.env`:
1. Install dotenv: `npm install dotenv` or `yarn add dotenv`.
2. At the top of your main server file (e.g., `index.js`), add `require('dotenv').config()`.
3. Access the keys in your code with `process.env.YOUR_VARIABLE_NAME`.
4. Add `.env` to your `.gitignore` file to prevent it from being pushed to GitHub.

### Securing Keys in Next.js:
- For Next.js, use the built-in support for environment variables. Prefix them with `NEXT_PUBLIC_` to expose them to the browser, if necessary.

## 5. Deploying a Yarn-Based Web App to Vercel
1. Ensure your project uses Yarn by having a `yarn.lock` file.
2. Connect your GitHub repository to Vercel by signing in at [Vercel](https://vercel.com/) and importing your project.
3. Configure the build settings if needed (e.g., build command might be `yarn build` and output directory `build`).
4. Deploy by pushing changes to your connected repository branch; Vercel automatically deploys new commits.

## 6. Installing Yarn/npm

### macOS:
1. Install Homebrew by running `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` in Terminal.
2. Install Node.js (includes npm) with `brew install node`.
3. Install Yarn with `brew install yarn`.

### Windows:
1. Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. Install Yarn with `npm install -g yarn`.

## 7. Running Development Server and Linting
- Start your development server using `yarn dev` or `npm run dev`.
- For linting, set up ESLint in your project and run `yarn lint` or `npm run lint` to check your code for errors.

This guide covers the essentials to get you started with GitHub Desktop and best practices for modern web development, ensuring your projects are secure and deployable with ease.