const webpack = require('webpack');
const path = require('path');
console.log('Port LESS vars to js file');
console.log(path.resolve(__dirname, '../style/variables.js'));
webpack(
  {
    infrastructureLogging: {
      level: 'verbose',
    },
    entry: path.resolve(__dirname, '../style/variables.js'),
    output: {
      filename: 'variables.js',
      path: path.resolve(__dirname, '../dist/styles'),
      libraryTarget: 'commonjs2',
    },

    mode: 'production',
  }).run();
