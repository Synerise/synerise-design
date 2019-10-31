const path = require('path');

module.exports = async ({ config, mode }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: require.resolve('less-vars-loader'),
      },
    ],
  });

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
