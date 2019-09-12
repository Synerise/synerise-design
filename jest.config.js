const baseConfig = require('./config/jest/base.config.js')

module.exports = {
  ...baseConfig,
  collectCoverage: false,
  testMatch: [`<rootDir>/packages/**/*/?(*.)+(spec|test).(tsx|ts)`]
}
