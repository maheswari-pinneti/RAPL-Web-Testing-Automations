const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Tell Playwright where your tests are
  testDir: './tests',
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Configure retries
  retries: process.env.CI ? 2 : 0,
  
  // Number of workers (browsers running in parallel)
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter for test results
  reporter: 'html',
  
  // Global settings for all tests
  use: {
    // 👇 THIS IS THE IMPORTANT PART
    baseURL: 'https://demo.getrapl.com',
    
    // Record traces when retrying tests
    trace: 'on-first-retry',
  },

  // Configure different browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        viewport: { width: 1280, height: 720 },
        // You can add browser-specific settings here
      },
    },
    {
      name: 'firefox',
      use: { 
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});