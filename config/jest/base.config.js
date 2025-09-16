const path = require('path');
const { defaults } = require('jest-config');

const esModules = ['@synerise'].join('|');

module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  modulePathIgnorePatterns: ['<rootDir>/scripts/', '<rootDir>/.*/__mocks__'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/config/jest/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/config/jest/__mocks__/svgrMock.js',
    '^rc-virtual-list$': '<rootDir>/config/jest/__mocks__/rc-virtual-list.js'
  },
  rootDir: path.resolve(__dirname, '..', '..'),
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup/index.js'],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  testEnvironment: "jest-environment-jsdom",
};
