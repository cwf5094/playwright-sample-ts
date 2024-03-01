import { test as base } from '@playwright/test';
import WebUsers, { WebUsersFixture } from '../database/webusers';

/**
 * This file adds all of our data objects as new fixture options, which allows us to easily use them in any test
 * For each new fixture, we need to:
 *  1. Set up the fixture (equivalent to a "before/beforeAll" step) (Optional)
 *  2. Use the fixture
 *  3. Clean up the fixture (equivalent to an "after/afterAll" step) (Optional)
 */

// Extend base test by providing each data object as a new feature
// This new "test" can be used in any test file, and each of them will have access to the fixtures
// Note: All fixtures rely on database.ts, which requires a valid database connection
export const test = base.extend<
  {},
  {
    // Declare the types of your fixtures
    users: WebUsersFixture;
  }
>({
  users: [
    async ({}, use, workerInfo) => {
      console.log('User fixture initialized');
      console.log(workerInfo.workerIndex);

      await WebUsers.init();
      await use(WebUsers);
    },
    { scope: 'worker' },
  ],
});
