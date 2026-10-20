const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Mobile Menu Drawer', () => {
  test('should toggle mobile menu visibility and icons on click', async ({ page }) => {
    // Navigate to the local index.html file
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);

    // Set viewport to mobile size to ensure the mobile menu button is visible
    await page.setViewportSize({ width: 375, height: 667 });

    const menuBtn = page.locator('#mobile-menu-btn');
    const mobileMenu = page.locator('#mobile-menu');
    const barsIcon = page.locator('#menu-icon-bars');
    const closeIcon = page.locator('#menu-icon-close');

    // Initial state checks
    await expect(mobileMenu).toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(barsIcon).not.toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(closeIcon).toHaveClass(/(^|\s)hidden(\s|$)/);

    // Open menu
    await menuBtn.click();
    await expect(mobileMenu).not.toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(barsIcon).toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(closeIcon).not.toHaveClass(/(^|\s)hidden(\s|$)/);

    // Close menu
    await menuBtn.click();
    await expect(mobileMenu).toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(barsIcon).not.toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(closeIcon).toHaveClass(/(^|\s)hidden(\s|$)/);
  });

  test('should close menu when a mobile nav link is clicked', async ({ page }) => {
    // Navigate to the local index.html file
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);

    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    const menuBtn = page.locator('#mobile-menu-btn');
    const mobileMenu = page.locator('#mobile-menu');
    const barsIcon = page.locator('#menu-icon-bars');
    const closeIcon = page.locator('#menu-icon-close');
    const firstNavLink = page.locator('.mobile-nav-link').first();

    // Open menu
    await menuBtn.click();
    await expect(mobileMenu).not.toHaveClass(/(^|\s)hidden(\s|$)/);

    // Click a nav link
    await firstNavLink.click();

    // Check that it closed
    await expect(mobileMenu).toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(barsIcon).not.toHaveClass(/(^|\s)hidden(\s|$)/);
    await expect(closeIcon).toHaveClass(/(^|\s)hidden(\s|$)/);
  });
});