const { test, expect } = require('@playwright/test');

test('Debug Page Content', async ({ page }) => {
  console.log('Starting test...');
  
  // Go to the website
  await page.goto('https://demo.getrapl.com');
  console.log('Navigated to website');
  
  // Wait longer for page to load
  await page.waitForLoadState('networkidle');
  console.log('Page loaded (networkidle)');
  
  // Take screenshot to see what's actually there
  await page.screenshot({ path: 'debug-page.png', fullPage: true });
  console.log('Screenshot saved: debug-page.png');
  
  // Get ALL text content on the page
  const allText = await page.textContent('body');
  console.log('\n=== ALL TEXT ON PAGE ===');
  console.log(allText);
  console.log('=== END OF TEXT ===\n');
  
  // Try different selectors for "User ID / Email ID"
  console.log('Trying to find elements...');
  
  // Option 1: Look for input placeholder
  const inputPlaceholders = await page.locator('input').all();
  console.log(`Found ${inputPlaceholders.length} input elements`);
  for (let i = 0; i < inputPlaceholders.length; i++) {
    const placeholder = await inputPlaceholders[i].getAttribute('placeholder');
    const type = await inputPlaceholders[i].getAttribute('type');
    console.log(`Input ${i}: type="${type}", placeholder="${placeholder}"`);
  }
  
  // Option 2: Look for any text containing "User", "Email", "ID"
  const possibleTexts = ['User', 'Email', 'ID', 'Continue', 'Register'];
  for (const text of possibleTexts) {
    const locator = page.locator(`text=${text}`);
    const count = await locator.count();
    console.log(`Elements with "${text}": ${count}`);
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const elementText = await locator.nth(i).textContent();
        console.log(`  "${text}" element ${i}: "${elementText}"`);
      }
    }
  }
  
  // Wait so we can see in browser
  console.log('Test complete - browser will close in 5 seconds');
  await page.waitForTimeout(5000);
});