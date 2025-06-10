# Cypress Course

This is a Next.js project bootstrapped with `create-next-app`.

---

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses `next/font` to automatically optimize and load **Inter**, a custom Google Font.

---

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – an interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) – your feedback and contributions are welcome!

---

## ▲ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## ✅ End-to-End Testing with Cypress

This project includes end-to-end tests powered by [Cypress](https://www.cypress.io/), integrated with GitHub Actions and generates visual test reports hosted via GitHub Pages.

---

### 🔍 Features

- ✅ **Cypress** for browser-based testing
- 📊 **Mochawesome** for HTML test reports
- 🤖 **GitHub Actions** for automated test runs
- 🌐 **GitHub Pages** for publicly available reports

---

### ⚙️ CI Workflow Overview

When you push to the `main` branch or open a pull request to `main`, the GitHub Actions workflow will:

1. Spin up a Docker container using the Cypress browsers image.
2. Install Node.js dependencies via `npm ci`.
3. Start the frontend app and run Cypress tests.
4. Capture screenshots/videos on failure.
5. Merge and convert test results into a single HTML report.
6. Publish the report to the `gh-pages` branch using GitHub Pages.

---

### 🧪 View Cypress Report

Access the latest Cypress HTML test report at:

🔗 **[https://ethanjowb98.github.io/cypress-course/](https://ethanjowb98.github.io/cypress-course/)**

> ⚠️ Note: If the page shows a 404 error, make sure the file `mochawesome-report/index.html` was generated and deployed correctly.

---

### 📜 NPM Scripts

Make sure your `package.json` includes the following scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test:ci": "start-server-and-test dev http://localhost:3000 'cypress run --browser chrome'",
  "report:html": "mochawesome-merge cypress/results/*.json > mochawesome.json && marge mochawesome.json --reportDir mochawesome-report --inline"
}
```

---

### 🛠 Required Dependencies

Install necessary test/report tools:

```bash
npm install --save-dev cypress mochawesome mochawesome-merge mochawesome-report-generator start-server-and-test
```

Also ensure Cypress test results are configured to output JSON using `cypress.config.js`:

```js
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/results',
  overwrite: false,
  html: false,
  json: true
}
```

---

### 📂 GitHub Actions Workflow

GitHub Actions is configured in `.github/workflows/<your-file>.yml`. The key parts include:

```yaml
name: Cypress Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    container:
      image: cypress/browsers:latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Restore npm cache
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci

      - name: Run frontend and Cypress tests
        run: npm run test:ci

      - name: Upload Cypress screenshots/videos (on failure)
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-fail-artifacts
          path: |
            cypress/screenshots
            cypress/videos

      - name: Generate HTML test report
        if: always()
        run: |
          npm run report:html
          cp mochawesome-report/mochawesome.html mochawesome-report/index.html

      - name: Deploy HTML report to GitHub Pages
        if: always()
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: mochawesome-report
          publish_branch: gh-pages
```

---

### 📝 Final Notes

- The HTML report will only work if `index.html` exists in the `mochawesome-report` directory.
- Ensure GitHub Pages is enabled and set to use the `gh-pages` branch as the source with `/` (root) directory.

---

Happy testing! 🧪✨
