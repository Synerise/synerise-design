const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: require.resolve('style-loader'),
      }, {
        loader: require.resolve('css-loader'),
      }, {
        loader: require.resolve('less-loader'),
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-react-app'],
          plugins: [
            ['transform-rename-import', {
              replacements: [
                {
                  original: '@synerise\/ds-core(\/dist)?(.*)',
                  replacement: (importName, isDist, rest) => {
                    let result = '@synerise/ds-core/src';
                    return isDist ? `${result}${rest}` : `${result}/js`;
                  },
                },
                {
                  original: '@synerise\/ds-((?!core)[a-z0-9-]+)(\/dist)?(.*)',
                  replacement: '@synerise/ds-$1/src$3',
                },
              ],
            }],
          ],
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
