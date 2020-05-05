import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
// import 'raf/polyfill'
// import 'jest-prop-type-error'

import '@testing-library/jest-dom/extend-expect'

import './enzyme.js'

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
})
