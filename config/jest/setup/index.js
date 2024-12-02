import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-pluralrules/polyfill';

import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom'

import '../__mocks__/resizeObserverMock';
import '../__mocks__/intersectionObserverMock';
import '../__mocks__/mutationObserverMock';
import '../__mocks__/domRectMock';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

