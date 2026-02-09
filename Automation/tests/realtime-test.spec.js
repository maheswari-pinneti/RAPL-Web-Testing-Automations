const { test, expect } = require('@playwright/test');

test('Real-time RAPL Login Test', async ({ page }) => {
  console.log('🚀 Starting real-time test...');
  
  // Step 1: Go to RAPL website
  console.log('📡 Navigating to https://demo.getrapl.com');
  await page.goto('https://demo.getrapl.com');
  
  // Step 2: Wait for page to load
  console.log('⏳ Waiting for page to load...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Step 3: Take screenshot so we can see
  await page.screenshot({ path: 'realtime-homepage.png' });
  console.log('📸 Screenshot saved: realtime-homepage.png');
  
  // Step 4: Get page title and URL
  const pageTitle = await page.title();
  const pageURL = await page.url();
  console.log('🔍 Page Title:', pageTitle);
  console.log('🔗 Current URL:', pageURL);
  
  // Step 5: List ALL text content
  console.log('\n📄 Looking for all text on page...');
  const bodyText = await page.locator('body').textContent();
  console.log('First 500 characters of page text:');
  console.log(bodyText.substring(0, 500));
  
  // Step 6: Try to find input fields
  console.log('\n🔎 Searching for input fields...');
  const allInputs = await page.locator('input').count();
  console.log(`Found ${allInputs} input fields`);
  
  for (let i = 0; i < allInputs; i++) {
    const input = page.locator('input').nth(i);
    const type = await input.getAttribute('type') || 'text';
    const placeholder = await input.getAttribute('placeholder') || '(no placeholder)';
    const id = await input.getAttribute('id') || '(no id)';
    const name = await input.getAttribute('name') || '(no name)';
    
    console.log(`Input ${i}: type="${type}", id="${id}", name="${name}", placeholder="${placeholder}"`);
  }
  
  // Step 7: Try to find buttons - FIXED VERSION
  console.log('\n🔘 Searching for buttons...');
  const allButtons = await page.locator('button, input[type="submit"], input[type="button"]').count();
  console.log(`Found ${allButtons} buttons/submit elements`);
  
  for (let i = 0; i < allButtons; i++) {
    const button = page.locator('button, input[type="submit"], input[type="button"]').nth(i);
    let buttonText = '';
    
    // Try to get text content
    try {
      buttonText = await button.textContent();
    } catch (e) {
      // If that fails, try to get value attribute
      try {
        buttonText = await button.getAttribute('value') || '';
      } catch (e) {
        buttonText = '';
      }
    }
    
    console.log(`Button ${i}: "${buttonText}"`);
  }
  
  // Step 8: Try to interact with the page
  console.log('\n🖱️ Attempting to interact with page...');
  
  // Try to find and click on text that might be "User ID / Email ID"
  const userEmailLocator = page.locator('text=/user.*id.*email.*id/i');
  if (await userEmailLocator.count() > 0) {
    console.log('✅ Found text matching "User ID / Email ID"');
    const exactText = await userEmailLocator.first().textContent();
    console.log(`Exact text: "${exactText}"`);
  } else {
    console.log('❌ Could not find "User ID / Email ID" text');
    
    // Look for any login-related text
    const loginTexts = ['Login', 'Sign in', 'User', 'Email', 'Continue'];
    for (const text of loginTexts) {
      const locator = page.locator(`text=${text}`);
      if (await locator.count() > 0) {
        const foundText = await locator.first().textContent();
        console.log(`Found "${text}" as: "${foundText}"`);
      }
    }
  }
  
  // Step 9: Try to fill first input field
  const firstInput = page.locator('input').first();
  if (await firstInput.count() > 0) {
    console.log('\n⌨️ Filling first input field with test email...');
    await firstInput.fill('test@example.com');
    console.log('✅ Input filled');
    
    // Take screenshot after filling
    await page.screenshot({ path: 'realtime-filled.png' });
    console.log('📸 Screenshot saved: realtime-filled.png');
  }
  
  // Step 10: Try to click first button
  const firstButton = page.locator('button').first();
  if (await firstButton.count() > 0) {
    const buttonText = await firstButton.textContent();
    console.log(`\n🖱️ Clicking first button (text: "${buttonText}")...`);
    await firstButton.click();
    
    // Wait and see what happens
    await page.waitForTimeout(3000);
    
    // Check new URL
    const newURL = await page.url();
    console.log(`🔄 After click, URL is: ${newURL}`);
    
    // Take screenshot
    await page.screenshot({ path: 'realtime-after-click.png' });
    console.log('📸 Screenshot saved: realtime-after-click.png');
  }
  
  console.log('\n🎉 Test completed!');
  console.log('📁 Check the screenshots in your Automation folder:');
  console.log('   - realtime-homepage.png');
  console.log('   - realtime-filled.png');
  console.log('   - realtime-after-click.png');
});