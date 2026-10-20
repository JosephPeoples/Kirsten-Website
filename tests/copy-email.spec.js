const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Copy Email to Clipboard', () => {
  test('should copy email and show visual feedback', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Load the local index.html file
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);

    const copyBtn = page.locator('#copy-email-btn');
    const copyText = page.locator('#copy-email-text');

    // Initial state
    await expect(copyText).toHaveText('Copy Email');

    // Click the button
    await copyBtn.click();

    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe('peoples.socialmarketing@gmail.com');

    // Verify visual feedback
    await expect(copyText).toHaveText('Copied to Clipboard!');
    await expect(copyBtn).toHaveClass(/text-pink-300/);

    // Wait for the timeout to restore the initial state
    // The timeout in the code is 2500ms
    await page.waitForTimeout(2600);

    // Verify state is restored
    await expect(copyText).toHaveText('Copy Email');
    await expect(copyBtn).not.toHaveClass(/text-pink-300/);
  });
});
