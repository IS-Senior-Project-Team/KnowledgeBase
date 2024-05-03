Setting up a new Next.js project and configuring a GitHub Pull Request (PR) template involves several straightforward steps. Below, I'll guide you through initializing a Next.js application, setting up your development environment, and creating a PR template in your GitHub repository.

### Setting Up a Next.js Project

1. **Install Node.js**: Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Yarn**: Although optional, Yarn is a fast and reliable alternative to npm. Install it via npm with:
   ```bash
   npm install -g yarn
   ```

3. **Create Next.js App**: Use the create-next-app CLI to bootstrap your project:
   ```bash
   npx create-next-app@latest my-next-app
   # or
   yarn create next-app my-next-app
   ```
   Replace `my-next-app` with your preferred project name.

4. **Navigate into the directory**:
   ```bash
   cd my-next-app
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit `http://localhost:3000` in your browser to see your new site.

### Setting Up a GitHub Repository

1. **Initialize a Git repository**:
   ```bash
   git init
   ```

2. **Add files to the repository**:
   ```bash
   git add .
   ```

3. **Commit the files**:
   ```bash
   git commit -m "Initial commit"
   ```

4. **Create a new repository on GitHub**: Go to GitHub and create a new repository. Follow the instructions to add your existing repository to GitHub, which typically involves:
   ```bash
   git remote add origin <repository-URL>
   git push -u origin master
   ```

### Creating a GitHub PR Template

GitHub allows you to define pull request templates to standardize and expedite the PR process. Here’s how to set one up:

1. **Create a `.github` folder** in the root directory of your repository:
   ```bash
   mkdir .github
   ```

2. **Create a `PULL_REQUEST_TEMPLATE` folder** inside the `.github` directory:
   ```bash
   mkdir .github/PULL_REQUEST_TEMPLATE
   ```

3. **Create a pull request template file**:
   You can have multiple templates for different types of PRs. For a general template, create a file called `pull_request_template.md`:
   ```bash
   touch .github/PULL_REQUEST_TEMPLATE/pull_request_template.md
   ```

4. **Edit the PR template**:
   Open `pull_request_template.md` in your favorite text editor and add the following sections:
   ```markdown
   # Description
   Please include a summary of the change and which issue is fixed. Include the motivation and context, and list any dependencies that are required for this change.

   # Type of change
   - [ ] Bug fix (non-breaking change which fixes an issue)
   - [ ] New feature (non-breaking change which adds functionality)
   - [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
   - [ ] This change requires a documentation update

   # How Has This Been Tested?
   Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test configuration.

   # Checklist:
   - [ ] My code follows the style guidelines of this project
   - [ ] I have performed a self-review of my own code
   - [ ] I have commented my code, particularly in hard-to-understand areas
   - [ ] I have made corresponding changes to the documentation
   - [ ] My changes generate no new warnings
   - [ ] I have added tests that prove my fix is effective or that my feature works
   - [ ] New and existing unit tests pass locally with my changes
   ```

5. **Commit and push your changes**:
   ```bash
   git add .github/PULL_REQUEST_TEMPLATE/pull_request_template.md
   git commit -m "Add PR template"
   git push
   ```

With these steps, you've set up a Next.js project, initialized a GitHub repository, and created a PR template to standardize how changes are proposed and merged into your codebase. This will help maintain code quality and streamline the review process.