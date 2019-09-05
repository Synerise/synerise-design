const webpack = require('webpack');
const path = require('path');
console.log('Port LESS vars to js file');
const entry = path.resolve(__dirname, '../src/js/DSProvider/ThemeProvider/variables.js');
webpack({
  infrastructureLogging: {
    level: 'verbose',
  },
  entry: entry,
  output: {
    filename: 'variables.js',
    path: path.resolve(__dirname, '../dist/js/DSProvider/ThemeProvider'),
    libraryTarget: 'commonjs2',
  },

  mode: 'production',
}).run();
