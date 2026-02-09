const { test, expect } = require('@playwright/test');

test('Register New User', async ({ page }) => {
  await page.goto('https://demo.getrapl.com');
  
  // Wait for page to load completely
  await page.waitForLoadState('networkidle');
  
  // Click "Register As New User" link/button
  // Using exact text from your screenshot
  await page.click('text=Register As New User');
  
  // Wait for registration form to load
  // The form might open in a modal or new page
  await page.waitForTimeout(3000);
  
  // Check if we're on a different page or if form opened
  console.log('After clicking register, URL is:', await page.url());
  
  // Try to find registration form elements
  // Common registration field names
  const nameField = await page.locator('input[name="name"], input[id*="name"], input[placeholder*="Name"]').first();
  
  if (await nameField.isVisible()) {
    // Fill registration form
    await page.fill('input[name="name"], input[id*="name"]', 'Test User');
    await page.fill('input[type="tel"], input[name*="mobile"], input[name*="phone"]', '9876543210');
    await page.fill('input[type="email"]', 'testuser123@mail.com');
    await page.fill('input[type="password"]', 'Test@123');
    
    // Click register/submit button
    await page.click('button:has-text("Register"), button:has-text("Submit")');
  } else {
    console.log('Registration form not found. Maybe it opens in a popup or different way.');
    
    // Take screenshot to see what happened
    await page.screenshot({ path: 'register-click-result.png' });
  }
  
  // Wait to see what happens
  await page.waitForTimeout(5000);
});