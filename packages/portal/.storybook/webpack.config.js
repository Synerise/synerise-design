const path = require('path');

module.exports = async ({ config, mode }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

  const rules = config.module.rules;

  const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
  fileLoaderRule.exclude = /packages\/components\/icon\/dist\/icons/;

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

  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  config.module.rules.push({
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          babel: true,
          icon: true,
        },
      },
      'url-loader',
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
