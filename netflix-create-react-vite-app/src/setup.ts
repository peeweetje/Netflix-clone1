import '@testing-library/jest-dom';
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

if (expect && matchers) {
  expect.extend(matchers);
}
