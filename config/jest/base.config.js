const path = require('path')
const {defaults} = require('jest-config');

module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  modulePathIgnorePatterns: ['<rootDir>/scripts/', '<rootDir>/.*/__mocks__'],
  rootDir: path.resolve(__dirname, '..', '..'),
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup/index.js'],
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/config/jest/babel-transformer.js'
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/.*/dist'],
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname'
  // ]
}
