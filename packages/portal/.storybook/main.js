/** @type { import("@storybook/core-common").StorybookConfig } */
module.exports = {
  "core": {
    builder: "webpack5" || require.resolve("@storybook/builder-webpack5"),
  },
  "stories": [
    // "../stories/**/*.stories.mdx",
    // "../stories/**/*.stories.@(js|jsx|ts|tsx)"
    // "../stories/components/Badge",
    "../stories/components/aademo",
  ],
  "addons": [
    '@storybook/addon-knobs',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  features: {
    storyStoreV7: process.env.NO_STORYSTOREV7 ? false : true,
    previewCsfV3: true,
    // interactionsDebugger: true,
    disableTelemetry: true,
  },
  // /** @type { import('webpack').Compilation } */
  webpackFinal: async (config /** typeof require('webpack').Compilation */, { configType }) => {
    config.module.rules.push({
      test: /\.(js|mjs|jsx)$/,
      resolve: {
        fullySpecified: false
      },
    });
    return config;
    /** @type { Array<{original: string | RegExp, replacement: string}> } */
    const replacements = [{
      original: '@synerise/ds-((?!core|icon)[a-z0-9-]+)(/dist)?(/src)?(.*)',
      replacement: '@synerise/ds-$1/src$4',
    }]
    /** @type { import("babel-loader").StorybookConfig } */
    const babelLoaderReplacement = {
      test: /\.tsx?$/,
      exclude: /node_modules/, // performance?
      use: [
        {
          loader: 'babel-loader',
          // exclude: /node_modules/,
          options: {
            presets: ['babel-preset-react-app'],
            plugins:
              // mode === 'PRODUCTION'
              //   ? [] :
                [
                    [
                      'transform-rename-import',
                      /** @type { replacements } */
                      /** @type { typeof replacements } */
                      /** @type { {replacements: Array<{original: string | object, replacement: string}>} } */
                      { replacements: /** @type { typeof replacements } */ [{original: 1}] }
                      || { replacements: replacements }
                    ]
                ]
          },
        },
      ],
    };
    if (process.env.NODE_ENV === 'development') {
      // config.module.rules.push(babelLoaderReplacement);
    }
    return config;
  },
}