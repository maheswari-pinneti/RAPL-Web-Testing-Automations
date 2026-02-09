# RAPL Web Testing Automation

## 🚀 Overview
This project is a **Web Testing Automation framework** for the RAPL platform.  
It uses **Playwright** to perform automated end-to-end (E2E) testing, including functional, security, and mobile-specific scenarios.  

The framework follows a modular folder structure using **Page Object Model (POM)** and organized test scripts.

---

## 🎯 Why This Project
Automated web testing is used to:  
- Reduce manual testing effort and errors  
- Ensure consistent functionality across updates  
- Verify mobile and security scenarios  
- Improve development speed with continuous testing integration  

We chose **Playwright** because it provides a reliable, fast, and cross-browser automation solution.

---

## 🛠 Technologies Used
- **Node.js** – JavaScript runtime for automation scripts  
- **Playwright** – End-to-end web testing framework  
- **JavaScript (ES6)** – Scripting language for test cases  
- **JSON** – For storing test results (`.last-run.json`)  

---

## 📂 Folder Structure

```

RAPL-WEB-TESTING-AUTOMATION/
│
├── .vscode/                  # VS Code settings
├── Automation/
│   ├── node_modules/          # Installed Node.js dependencies
│   ├── test-results/          # Test execution reports
│   │   └── .last-run.json     # Last run test results
│   ├── tests/                 # Test scripts
│   │   ├── emailLogin.spec.js      # Email login test
│   │   ├── mobileLogin.spec.js     # Mobile login test
│   │   ├── realtime-test.spec.js   # Real-time features test
│   │   ├── register.spec.js        # Registration test
│   │   ├── security-login.spec.js  # Security-related login tests
│   │   └── simple.spec.js          # Simple or demo tests
│   └── debug-page.png          # Screenshot for debugging
├── package.json               # Project dependencies & scripts
├── package-lock.json          # Node package lock file
└── README.md                  # Project documentation

````

---

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/RAPL-WEB-TESTING-AUTOMATION.git
cd RAPL-WEB-TESTING-AUTOMATION/Automation
````

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

---

## 📝 How to Use

### Run All Tests

```bash
npx playwright test
```

### Run a Specific Test File

```bash
npx playwright test tests/emailLogin.spec.js --headed
```

* `--headed` flag opens the browser so you can see the test in action.
* Without `--headed`, tests run in headless mode (background).

### View Test Results

* After running tests, view results in `Automation/test-results/.last-run.json`
* You can also generate an HTML report:

```bash
npx playwright show-report
```

---

## 📌 When to Use

* During **development** to verify new features
* After **updates or bug fixes** to prevent regressions
* For **cross-browser or mobile testing**
* Before **production deployment** to ensure stability and security

---

## 💡 Notes

* Follow **Page Object Model (POM)** when adding new test scripts
* Add screenshots or debug images in the `Automation/` folder for reference
* Keep `node_modules/` in `.gitignore` when pushing to GitHub

---

## 📫 Contact

**Maheswari Pinneti**
Email: [pinnetimaheswari17@gmail.com](mailto:pinnetimaheswari17@gmail.com)
GitHub: [https://github.com/maheswari-pinneti](https://github.com/maheswari-pinneti) 

```
