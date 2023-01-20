// import webpackFinal from './webpack.config.js';
// const webpackFinal = require('./webpack.config.js'); ERR! TypeError: Cannot destructure property 'configType' of 'undefined' as it is undefined. ERR!     at module.exports (@/.storybook/webpack.config.js:1:80)
// console.info('webpackFinal', webpackFinal)
// debugger

/** @type { import("@storybook/core-common").StorybookConfig } */
module.exports = {
  open: false, // fullOptions
  "core": {
    builder: "webpack5",// || require.resolve("@storybook/builder-webpack5"),
    // getBuilder:(name = config => config.core.builder) => `builder-${name}`
    // used by
    // caller: require(''),
    disableTelemetry: true,
    // crossOriginIsolated: false,
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
  },
  "stories": [
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    "../stories/components/Badge",
    // "../stories/components/aademo",
  ],
  "addons": [
    '@storybook/addon-knobs',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  features: {
    storyStoreV7: false,
    // storyStoreV7: process.env.NO_STORYSTOREV7 ? false : true,
    previewCsfV3: true,
    // interactionsDebugger: true,
    babelModeV7: true,
    disableTelemetry: true,
  },
  // /** @type { import('webpack').Compilation } */
  // webpackFinal: require('./webpack.config.js').default,
  /* called by require22('@storybook/builder-webpack5/dist/cjs/presets/custom-webpack-preset') loadCustomWebpackConfig */
  // webpackConfig: (c) => {
  //   return c
  // },
  webpackFinal: (config /** typeof require('webpack').Compilation */, { configType }) => {
    // config.target = 'node'
    // require('./webpack.config.js')({config, mode: configType}) // already called by custom-webpack-preset
    // webpackConfig is deprecated
    config.module.rules.push({
      test: /\.(js|mjs|jsx)$/,
      resolve: {
        fullySpecified: false
      },
    });

    // config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

    config.module.rules.push({
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    });

    // const storiesToCsf3 = require(__dirname + '/decorated-story-to-csf3')
    // console.info('storiesToCsf3', process.cwd(), storiesToCsf3)
 
    const babelEnv = [
      "@babel/preset-env",
      {
        // "useBuiltIns": "entry",
        // "corejs": "3.22",
        // targets: 'es2019', // https://www.npmjs.com/package/babel-preset-modern-browsers
        "modules": 'amd',
      }
    ]

    /** @type { import("webpack").RuleSetRule } */
    const babelLoader = {
      test: /\.tsx?$/,
      exclude: /node_modules/, // performance?
      use: [
        {
          loader: 'babel-loader' || require('babel-loader'),
          // exclude: /node_modules/,
          options: {
            presets: [
              // babelEnv, // changes order of exports (_exports_)
              'babel-preset-react-app',
            ],
            // plugins: [storiesToCsf3],
            plugins: ['./.storybook/decorated-story-to-csf3'],
          }
        }
      ]
    }
    config.module.rules.push(babelLoader);
    return config;
  },
}
