import { test as base } from '@playwright/test';
import WebUsers from '../database/webusers';

/**
 * This file adds all of our data objects as new fixture options, which allows us to easily use them in any test
 * For each new fixture, we need to:
 *  1. Set up the fixture (equivalent to a "before/beforeAll" step) (Optional)
 *  2. Use the fixture
 *  3. Clean up the fixture (equivalent to an "after/afterAll" step) (Optional)
 */

// Declare the types of your fixtures
type DataFixture = {
  users: typeof WebUsers;
};

// Extend base test by providing each data object as a new feature
// This new "test" can be used in any test file, and each of them will have access to the fixtures
// Note: All fixtures require a valid database connection
export const test = base.extend<DataFixture>({
  users: async ({}, use) => {
    await WebUsers.init();
    await use(WebUsers);
  },
});
