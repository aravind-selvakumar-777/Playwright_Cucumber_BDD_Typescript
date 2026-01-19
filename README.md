# 🚀 Playwright + TypeScript + Cucumber BDD Automation Framework

![Tests](https://img.shields.io/badge/BDD-Cucumber-blue)
![TypeScript](https://img.shields.io/badge/code-TypeScript-blue)
![Playwright](https://img.shields.io/badge/testing-Playwright-green)

Welcome! This repo features a scalable test automation framework combining [Playwright](https://playwright.dev/), [TypeScript](https://www.typescriptlang.org/), and [Cucumber](https://cucumber.io/) for **Behavior-Driven Development (BDD)**. 
Used AI to generate readme :p.

"This project uses the public demonstration site for OrangeHRM Open Source for educational and portfolio purposes. All tests are non-destructive and limited in volume to respect the host's server resources."
---

## ✨ Features

- 🔹 Fast & reliable end-to-end automation using Playwright
- 🔹 BDD-style test writing with Cucumber `.feature` files
- 🔹 Organized page objects and hooks for extensibility
- 🔹 TypeScript brings static typing to step definitions
- 🔹 Easy configuration for headless/headful execution
- 🔹 Parallel test execution and reporting support
- 🔹 Followed all best Testing practices while coding.

---

## ⚡ Prerequisites

- [Node.js](https://nodejs.org/) v16+ -- For running TS
- Visual Studio Code -- Code Editor
- Goto https://opensource-demo.orangehrmlive.com to setup environment variables later(Step 4 of Installation section).

---

## 🛠️ Installation

1. **Clone the Repository**  
    ```bash
    git clone https://github.com/aravind-selvakumar-777/Playwright_Cucumber_BDD_Typescript.git
    cd Playwright_Cucumber_BDD_Typescript
    ```

2. **Install Dependencies**  
    ```bash
    npm install
    ```

3. **Fetch Playwright Browsers**  
    ```bash
    npx playwright install --with-deps
    ```

4. Make sure you create a .env file in project root if you want to execute the current tests.
   Example:
   BASE_URL= OrangedemoURL
   NAME= Get from website
   PASSWORD= Get from website

---

## 🧪 Running Tests

- To run all tests in headless mode:
```bash
npm run test
```
- To run in specific browser:  
```bash
npm run test:chromium
npm run test:webkit
```

- To run in headed mode:  
  Replace `src/support/browser.ts` line 9 with below:  
  `browser = await envBrowser.launch({ headless: false });`

---

## 🧹 Linting

To check code quality and run lint:
```bash
npm run lint
```
By default, this runs TypeScript linting(with eslint) and style checks(with prettier) and auto fixes. Run this when you make code changes. 

## 📂 Project Structure

```bash
.
├── src/
│   ├── features/      # .feature files
│   ├── steps/         # Step defenition files
│   ├── support/       # world.ts, hooks
│   ├── page_objects/  # page objects
└── └── utils          # Holds helper functions, currently only holds to export .env file
├── .gitignore         # Files to ignore
├── .prettierrc        # Style settings
├── cucumber.json      # Cucumber settings
├── eslint.config.cjs  # Code quality settings
├── tsconfig.json      # TS settings
└── README.md
```

---

## 🚦 Example Usage

A sample Gherkin scenario:
```gherkin
Feature: Login functionality

  Scenario: Valid login
    Given I launch the login page
    When I enter valid credentials
    Then I should be redirected to the dashboard
```

---

## 🧩 Troubleshooting

- **Browser not launching?**  
  Ensure `npx playwright install --with-deps` was run.
- **Missing dependencies?**  
  Double-check with `npm install`.
- **Custom browser settings:**  
  Edit `src/support/browser.ts` for browser options.

---


## 📄 License & Author

- MIT License  
- Maintained by [@aravind-selvakumar-777](https://github.com/aravind-selvakumar-777)

---

Happy Testing! 🌱  
Questions, suggestions, or feedback? [Open an Issue!](https://github.com/aravind-selvakumar-777/Playwright_Cucumber_BDD_Typescript/issues)
