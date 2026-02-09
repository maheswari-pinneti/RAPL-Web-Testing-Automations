const { test } = require('@playwright/test');

test('Simple test', async ({ page }) => {
  console.log('Test starting...');
  await page.goto('https://example.com');
  console.log('Page loaded');
});