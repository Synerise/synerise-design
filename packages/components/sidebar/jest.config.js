const baseConfig = require('../../../config/jest/base.config.js');
const { name } = require('./package.json');

baseConfig.moduleNameMapper = {
  ...baseConfig.moduleNameMapper,
  "^dnd-core$": "dnd-core/dist/cjs",
  "^react-dnd$": "react-dnd/dist/cjs",
  "^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs",
  "^react-dnd-touch-backend$": "react-dnd-touch-backend/dist/cjs",
  "^react-dnd-test-backend$": "react-dnd-test-backend/dist/cjs",
  "^react-dnd-test-utils$": "react-dnd-test-utils/dist/cjs",
  "/^react-dnd-test-utils$/": "react-dnd-test-utils/dist/cjs"
};

module.exports = {
  ...baseConfig,
  displayName: name,
  name: name,
  testMatch: [`${__dirname}/**/?(*.)+(spec|test).(tsx|ts)`],
};