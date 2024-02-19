import { test } from '../../fixtures/fixtures';

test('Verify Basic Elements Present', async ({ githubHomePage }) => {
  await githubHomePage.verifyIsHomepage();
});

test('Verify Pricing Link', async ({ githubHomePage, page }) => {
  await githubHomePage.pricingLink.click();
  await page.waitForURL('https://github.com/pricing');
});
