import { test, expect } from '@playwright/test';

test('Github API Endpoint - /licenses', async ({ request }) => {
  const licenses = await request.get(`https://api.github.com/licenses`, {});
  expect(licenses.ok()).toBeTruthy();
});

test.describe('Github API Endpoint - /licenses/{license}', () => {
  const NOT_FOUND_JSON = {
    message: 'Not Found',
    documentation_url: 'https://docs.github.com/rest/licenses/licenses#get-a-license',
  };
  test('Not Found', async ({ request }) => {
    const FAKE_LICENSE = 'FAKE_LICENSE';
    const licenses = await request.get(`https://api.github.com/licenses/${FAKE_LICENSE}`, {});
    expect(licenses.status()).toBe(404);
    expect(await licenses.json()).toEqual(expect.objectContaining(NOT_FOUND_JSON));
  });

  test('OK', async ({ request }) => {
    const LICENSE = 'mit';
    const licenses = await request.get(`https://api.github.com/licenses/${LICENSE}`, {});
    expect(licenses.ok()).toBeTruthy();
  });
});

test.describe('Github API Endpoint - /repos/{owner}/{repo}/license', () => {
  const REPO = 'playwright-sample-ts';
  const USER = 'cwf5094';
  const NOT_FOUND_JSON = {
    message: 'Not Found',
    documentation_url: 'https://docs.github.com/rest/licenses/licenses#get-the-license-for-a-repository',
  };
  test('User Not Found', async ({ request }) => {
    const FAKE_USER = 'cwf5094ButNotReally';
    const licenses = await request.get(`https://api.github.com/repos/${FAKE_USER}/${REPO}/license`, {});
    expect(licenses.status()).toBe(404);
    expect(await licenses.json()).toEqual(expect.objectContaining(NOT_FOUND_JSON));
  });

  test('Repo Not Found', async ({ request }) => {
    const FAKE_REPO = 'playwright-sample-wrong';
    const licenses = await request.get(`https://api.github.com/repos/${USER}/${FAKE_REPO}/license`, {});
    expect(licenses.status()).toBe(404);
    expect(await licenses.json()).toEqual(expect.objectContaining(NOT_FOUND_JSON));
  });

  test('OK', async ({ request }) => {
    const licenses = await request.get(`https://api.github.com/repos/${USER}/${REPO}/license`, {});
    expect(licenses.ok()).toBeTruthy();
  });
});
