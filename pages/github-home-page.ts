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
  readonly emailInput: Locator;
  readonly signUpForGithubButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homepageLink = page.getByLabel('Homepage', { exact: true });
    this.signInButton = page.getByRole('link', { name: 'Sign in', exact: true });
    this.signUpButton = page.getByRole('link', { name: 'Sign up', exact: true });
    this.searchInput = page.locator('qbsearch-input');
    this.productsDropdown = page.getByRole('button', { name: 'Product' });
    this.solutionsDropdown = page.getByRole('button', { name: 'Solutions' });
    this.openSourceDropdown = page.getByRole('button', { name: 'Open Source' });
    this.pricingLink = page.getByLabel('Global').getByRole('link', { name: 'Pricing' });
    this.emailInput = page.getByLabel('Email address', { exact: true });
    this.signUpForGithubButton = page.getByRole('button', { name: 'Sign up for GitHub' }).first();
  }
  async navigate() {
    await this.page.goto(this.url);
  }
  async verifyIsHomepage() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.signUpForGithubButton).toBeVisible();
  }
}
