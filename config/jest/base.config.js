const path = require('path')
const {defaults} = require('jest-config');

module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['lcov'],
  modulePathIgnorePatterns: ['<rootDir>/scripts/', '<rootDir>/.*/__mocks__'],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/config/jest/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/jest/__mocks__/fileMock.js"
  },
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
