const { test, expect } = require('@playwright/test');

test('RAPL Security Login Page Test', async ({ page }) => {
  console.log('🚀 Starting RAPL Security Login Page Test...');
  
  // ========== STEP 1: Navigate to the login page ==========
  console.log('📡 Navigating to https://demo.getrapl.com/w/security/login');
  await page.goto('https://demo.getrapl.com/w/security/login');
  
  // ========== STEP 2: Wait for page to fully load ==========
  console.log('⏳ Waiting for page to load...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // ========== STEP 3: Take initial screenshot ==========
  await page.screenshot({ path: 'security-login-page.png', fullPage: true });
  console.log('📸 Screenshot saved: security-login-page.png');
  
  // ========== STEP 4: Get basic page info ==========
  const pageTitle = await page.title();
  const pageURL = await page.url();
  const pageSource = await page.content();
  
  console.log('🔍 Page Title:', pageTitle);
  console.log('🔗 Current URL:', pageURL);
  console.log('📏 Page Source Length:', pageSource.length, 'characters');
  
  // ========== STEP 5: Check if page loaded successfully ==========
  if (pageURL.includes('security/login')) {
    console.log('✅ Successfully reached security login page');
  } else {
    console.log('⚠️  Might have been redirected. Current URL:', pageURL);
  }
  
  // ========== STEP 6: Find ALL form elements ==========
  console.log('\n🔍 ========== FINDING FORM ELEMENTS ==========');
  
  // Find all input fields
  const inputFields = await page.locator('input').count();
  console.log(`📝 Input fields found: ${inputFields}`);
  
  for (let i = 0; i < inputFields; i++) {
    const input = page.locator('input').nth(i);
    const type = await input.getAttribute('type') || 'text';
    const id = await input.getAttribute('id') || '';
    const name = await input.getAttribute('name') || '';
    const placeholder = await input.getAttribute('placeholder') || '';
    const isVisible = await input.isVisible();
    
    console.log(`   Input ${i}: type="${type}", id="${id}", name="${name}", placeholder="${placeholder}", visible=${isVisible}`);
  }
  
  // Find all buttons
  const buttons = await page.locator('button, input[type="submit"], input[type="button"]').count();
  console.log(`\n🔘 Buttons found: ${buttons}`);
  
  for (let i = 0; i < buttons; i++) {
    const button = page.locator('button, input[type="submit"], input[type="button"]').nth(i);
    let buttonText = '';
    
    try {
      buttonText = await button.textContent() || await button.getAttribute('value') || '';
    } catch (e) {
      buttonText = '';
    }
    
    console.log(`   Button ${i}: "${buttonText}"`);
  }
  
  // Find all labels
  const labels = await page.locator('label').count();
  console.log(`🏷️  Labels found: ${labels}`);
  
  for (let i = 0; i < Math.min(labels, 5); i++) {
    const label = page.locator('label').nth(i);
    const labelText = await label.textContent() || '';
    const forAttr = await label.getAttribute('for') || '';
    console.log(`   Label ${i}: text="${labelText}", for="${forAttr}"`);
  }
  
  // ========== STEP 7: Check for specific login elements ==========
  console.log('\n🔍 ========== CHECKING SPECIFIC LOGIN ELEMENTS ==========');
  
  // Common login element patterns
  const loginElements = [
    { name: 'Username/Email field', selector: 'input[type="text"], input[type="email"], input[name*="user"], input[name*="email"], input[id*="user"], input[id*="email"]' },
    { name: 'Password field', selector: 'input[type="password"]' },
    { name: 'Login button', selector: 'button:has-text("Login"), button:has-text("Sign In"), input[type="submit"][value*="Login"], input[type="submit"][value*="Sign"]' },
    { name: 'Continue button', selector: 'button:has-text("Continue")' },
    { name: 'Remember me checkbox', selector: 'input[type="checkbox"][name*="remember"], input[type="checkbox"][id*="remember"]' },
    { name: 'Forgot password link', selector: 'a:has-text("Forgot"), a:has-text("Reset")' },
    { name: 'Register link', selector: 'a:has-text("Register"), a:has-text("Sign Up"), a:has-text("Create Account")' }
  ];
  
  for (const element of loginElements) {
    const locator = page.locator(element.selector);
    const count = await locator.count();
    console.log(`   ${element.name}: ${count} found`);
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 2); i++) {
        const elem = locator.nth(i);
        try {
          const text = await elem.textContent() || await elem.getAttribute('value') || await elem.getAttribute('placeholder') || '';
          if (text) console.log(`     - Text: "${text}"`);
        } catch (e) {}
      }
    }
  }
  
  // ========== STEP 8: Try to fill login form if elements exist ==========
  console.log('\n⌨️ ========== ATTEMPTING TO INTERACT WITH LOGIN FORM ==========');
  
  // Try to find username/email field
  const usernameField = page.locator('input[type="text"], input[type="email"], input[name*="user"], input[name*="email"]').first();
  if (await usernameField.count() > 0) {
    console.log('✅ Found username/email field');
    await usernameField.fill('testuser@example.com');
    console.log('   Filled with: testuser@example.com');
  } else {
    console.log('❌ No username/email field found');
  }
  
  // Try to find password field
  const passwordField = page.locator('input[type="password"]').first();
  if (await passwordField.count() > 0) {
    console.log('✅ Found password field');
    await passwordField.fill('TestPassword123!');
    console.log('   Filled with password');
  } else {
    console.log('❌ No password field found');
  }
  
  // Try to find and click login button
  const loginButton = page.locator('button:has-text("Login"), button:has-text("Sign In"), input[type="submit"][value*="Login"]').first();
  if (await loginButton.count() > 0) {
    console.log('✅ Found login button');
    const buttonText = await loginButton.textContent() || await loginButton.getAttribute('value') || '';
    console.log(`   Clicking "${buttonText}" button...`);
    
    // Take screenshot before clicking
    await page.screenshot({ path: 'before-login-click.png' });
    
    // Click the button
    await loginButton.click();
    
    // Wait for navigation or error
    await page.waitForTimeout(3000);
    
    // Check what happened
    const newURL = await page.url();
    console.log(`   After click, URL is: ${newURL}`);
    
    // Check for error messages
    const errorMessages = await page.locator('text=/error/i, text=/invalid/i, text=/incorrect/i, .error, .alert').count();
    if (errorMessages > 0) {
      console.log('   ⚠️  Error messages detected after login attempt');
    }
    
    // Take screenshot after clicking
    await page.screenshot({ path: 'after-login-click.png' });
  } else {
    console.log('❌ No login button found with expected text');
    
    // Try to click any submit button
    const anySubmit = page.locator('button[type="submit"], input[type="submit"]').first();
    if (await anySubmit.count() > 0) {
      console.log('   Found a generic submit button, clicking it...');
      await anySubmit.click();
      await page.waitForTimeout(2000);
      console.log(`   New URL: ${await page.url()}`);
    }
  }
  
  // ========== STEP 9: Test forgot password flow ==========
  console.log('\n🔐 ========== TESTING FORGOT PASSWORD FLOW ==========');
  
  const forgotPasswordLink = page.locator('a:has-text("Forgot"), a:has-text("Reset Password")').first();
  if (await forgotPasswordLink.count() > 0) {
    console.log('✅ Found forgot password link');
    const linkText = await forgotPasswordLink.textContent();
    console.log(`   Link text: "${linkText}"`);
    
    // Optional: Click the link to see what happens
    // await forgotPasswordLink.click();
    // await page.waitForTimeout(2000);
    // console.log(`   After clicking forgot password, URL: ${await page.url()}`);
    // await page.goBack(); // Go back to login page
  } else {
    console.log('❌ No forgot password link found');
  }
  
  // ========== STEP 10: Test registration link ==========
  console.log('\n📝 ========== TESTING REGISTRATION LINK ==========');
  
  const registerLink = page.locator('a:has-text("Register"), a:has-text("Sign Up")').first();
  if (await registerLink.count() > 0) {
    console.log('✅ Found registration link');
    const linkText = await registerLink.textContent();
    console.log(`   Link text: "${linkText}"`);
    
    // Optional: Click the link to see what happens
    // await registerLink.click();
    // await page.waitForTimeout(2000);
    // console.log(`   After clicking register, URL: ${await page.url()}`);
  } else {
    console.log('❌ No registration link found');
  }
  
  // ========== STEP 11: Final checks and summary ==========
  console.log('\n📊 ========== TEST SUMMARY ==========');
  console.log('✅ Test completed successfully!');
  console.log('📁 Screenshots saved:');
  console.log('   - security-login-page.png (initial page)');
  console.log('   - before-login-click.png (before clicking login)');
  console.log('   - after-login-click.png (after clicking login)');
  console.log('\n🔍 Key findings:');
  console.log(`   - Page URL: ${pageURL}`);
  console.log(`   - Page Title: ${pageTitle}`);
  console.log(`   - Input fields: ${inputFields}`);
  console.log(`   - Buttons: ${buttons}`);
  console.log(`   - Labels: ${labels}`);
  
  // ========== STEP 12: Verify page has expected structure ==========
  console.log('\n✅ ========== VERIFICATION CHECKS ==========');
  
  // Check 1: Page should have at least 1 input field
  expect(inputFields).toBeGreaterThan(0);
  console.log('   ✓ Page has input fields');
  
  // Check 2: Page should have at least 1 button
  expect(buttons).toBeGreaterThan(0);
  console.log('   ✓ Page has buttons');
  
  // Check 3: URL should contain security/login
  expect(pageURL).toContain('security/login');
  console.log('   ✓ URL contains security/login');
  
  console.log('\n🎉 All checks passed! Test completed successfully!');
});