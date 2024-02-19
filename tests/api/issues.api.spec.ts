import { test, expect } from '@playwright/test';

const REPO = 'test-repo-1';
const USER = 'cwf5094';

test.describe('Github API Endpoint - /repos/{USER}/{REPO}/issues', () => {
  test.describe.configure({ mode: 'default' });
  test.beforeAll(async ({ request }) => {
    // Create a new repository
    const response = await request.post('https://api.github.com/user/repos', {
      // headers: {
      //   Accept: 'application/vnd.github+json',
      //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   'X-GitHub-Api-Version': '2022-11-28',
      // },
      data: {
        name: REPO,
      },
    });
    console.log(response);
    expect(response.ok()).toBeTruthy();
  });
  test('Bugs', async ({ request }) => {
    const expectedTitle = '[Bug] report 1';
    const expectedDescription = 'Bug description';
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
      // headers: {
      //   Accept: 'application/vnd.github+json',
      //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   'X-GitHub-Api-Version': '2022-11-28',
      // },
      data: {
        owner: USER,
        repo: REPO,
        title: expectedTitle,
        body: expectedDescription,
      },
    });
    console.log(newIssue);
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
      // headers: {
      //   Accept: 'application/vnd.github+json',
      //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   'X-GitHub-Api-Version': '2022-11-28',
      // },
      data: {
        owner: USER,
        repo: REPO,
      },
    });
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(
      expect.objectContaining({
        title: expectedTitle,
        body: expectedDescription,
      }),
    );
  });

  test('Feature', async ({ request }) => {
    const expectedTitle = '[Feature] request 1';
    const expectedDescription = 'Feature description';
    const newIssue = await request.post(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
      // headers: {
      //   Accept: 'application/vnd.github+json',
      //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   'X-GitHub-Api-Version': '2022-11-28',
      // },
      data: {
        title: expectedTitle,
        body: expectedDescription,
      },
    });
    console.log(newIssue);
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`https://api.github.com/repos/${USER}/${REPO}/issues`, {
      // headers: {
      //   Accept: 'application/vnd.github+json',
      //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   'X-GitHub-Api-Version': '2022-11-28',
      // },
    });
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(
      expect.objectContaining({
        title: expectedTitle,
        body: expectedDescription,
      }),
    );
  });
  test.afterAll(async ({ request }) => {
    // Delete the repository
    const response = await request.delete(`https://api.github.com/repos/${USER}/${REPO}`, {
      // headers: {
      //   Accept: 'application/vnd.github+json',
      //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      //   'X-GitHub-Api-Version': '2022-11-28',
      // },
    });
    console.log(response);
    expect(response.ok()).toBeTruthy();
  });
});
