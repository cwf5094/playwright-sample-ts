# playwright-sample-ts
A sample repository of a Playwright test framework built with Typescript

## Installation

To install, simply clone the repository and install the dependencies:

```bash
npm install
```

## Project Structure

### Database

This is an implementation of a database connection made through the [mssql](https://www.npmjs.com/package/mssql) package that allows direct database integration with tests, particularly end-to-end.  It is designed to establish a connection to a particular database, and then separate the data into classes extending `DataTable`.  These tables are also paired with a set of helper functions that are all available through fixtures.  In this way, data is loaded only as needed on a per table basis.

### Pages

Pages implement the standard [page object model](https://playwright.dev/docs/pom) to improve readability and maintainability of tests (particularly UI and End-to-End).  This repository provides one simple example built around the Github home page that is used in a very basic end-to-end test.

### Fixtures

[Fixtures](https://playwright.dev/docs/test-fixtures) are used both with page objects and data objects to greatly simplify the setup/teardown process of testing.  For example, if testing the login page of an application, the test may need access to the `loginPage` page fixture and the `users` data fixture:

```ts
test('Test Login Page', async ({ loginPage, users }) => {
  // Tests around the login page
});
```

### UI Testing

Tests under this folder represent UI integration tests, which will typically involve [mocking API requests](https://playwright.dev/docs/mock) in some fashion.  The example in this repository makes use of `page.route`, but mocking can also be done with HAR files with `page.routeFromHAR`.

### API Testing

The API tests in this repository use the Github API, similar to the [Playwright examples](https://playwright.dev/docs/api-testing).  For local testing, a personal access token with the proper privileges will need to be passed as the `GITHUB_TOKEN` environment variable.  This is not necessary for [CI testing](#cicd-integration).

### End-to-End Testing

End-to-End tests will typically make use of a number of page objects and fixtures that model pieces of an entire application or website, but are also very simple to write in Playwright.  For the purposes of this repository, only a very simple test is provided making use of `githubHomePage`, but this can easily be extended to make use of other page objects, fixtures, and more!

## CI/CD Integration

This repository is fully integrated into a Github Actions pipeline defined by `playwright.yml`.  The `GITHUB_TOKEN` environment variable is set there to match the actual [GITHUB_TOKEN secret token](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#about-the-github_token-secret), removing the need for any personal access token.

Note: Certain configurations and tests depend on the `CI` environment variable.  When set, certain tests will be skipped and the maximum amount of workers will be changed (see `playwright.config.ts`)