import { mergeTests } from '@playwright/test';
import { test as dbTest } from './data-fixtures';
import { test as pageTest } from './page-fixtures';

// Merges separate fixture files into one import
export const test = mergeTests(dbTest, pageTest);
