import { test as base } from '@playwright/test';
import { GithubHomePage } from '../pages/github-home-page';

/**
 * This file adds all of our page objects as new fixture options, which allows us to easily use them in any test
 * For each new fixture, we need to:
 *  1. Set up the fixture (equivalent to a "before/beforeAll" step) (Optional)
 *  2. Use the fixture
 *  3. Clean up the fixture (equivalent to an "after/afterAll" step) (Optional)
 */

// Declare the types of your fixtures
type PageFixture = {
  githubHomePage: GithubHomePage;
};

// Extend base test by providing each page object as a new feature
// This new "test" can be used in any test file, and each of them will have access to the fixtures
export const test = base.extend<PageFixture>({
  githubHomePage: async ({ page }, use) => {
    const githubHomePage = new GithubHomePage(page);
    await githubHomePage.navigate();
    await use(githubHomePage);
  },
});
