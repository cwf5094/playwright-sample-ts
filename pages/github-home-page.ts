import { Locator, Page, expect } from '@playwright/test';

export class GithubHomePage {
  readonly page: Page;
  readonly url: string = 'https://github.com/';
  readonly homepageLink: Locator;
  readonly productsDropdown: Locator;
  readonly solutionsDropdown: Locator;
  readonly openSourceDropdown: Locator;
  readonly pricingLink: Locator;
  readonly searchInput: Locator;
  readonly signInButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homepageLink = page.getByLabel('Homepage', { exact: true });
    this.signInButton = page.getByRole('link', { name: 'Sign in' });
    this.signUpButton = page.getByRole('link', { name: 'Sign up' });
    this.searchInput = page.locator('qbsearch-input');
    this.productsDropdown = page.getByRole('button', { name: 'Product' });
    this.solutionsDropdown = page.getByRole('button', { name: 'Solutions' });
    this.openSourceDropdown = page.getByRole('button', { name: 'Open Source' });
    this.pricingLink = page.getByLabel('Global').getByRole('link', { name: 'Pricing' });
  }
  async navigate() {
    this.page.goto(this.url);
  }
  async verifyIsHomepage() {
    await expect(this.homepageLink).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.productsDropdown).toBeVisible();
    await expect(this.solutionsDropdown).toBeVisible();
    await expect(this.openSourceDropdown).toBeVisible();
    await expect(this.pricingLink).toBeVisible();
  }
}
