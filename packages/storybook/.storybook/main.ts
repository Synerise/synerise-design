import type { StorybookConfig } from '@storybook/react-webpack5';
import { join, dirname, resolve } from 'path';


/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
console.log(getAbsolutePath('tsconfig-paths-webpack-plugin'));

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'), 
    getAbsolutePath('@storybook/addon-interactions'),
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [resolve(__dirname, '../stories')], 
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
          injectStoryParameters: false,
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  async webpackFinal(config, { configType }) {
    
    const plugins: any[] = [];
    if (process.env['STORYBOOK_REPO_URL_PREFIX'] || process.env['STORYBOOK_BUNDLE_DS_SRC_DOCS_LINKS']) {
      plugins.concat([
        require('@synerise/portal-plugin-docs-inline-stories-links-to-sources').addLinksToStories,
      ])
    }
    if (configType !== 'PRODUCTION') {
      plugins.concat([
        [
          'transform-rename-import',
          {
            replacements: [
              {
                original: '@synerise/ds-core(/dist)?(.*)',
                replacement: (importName, isDist, rest) => {
                  let result = '@synerise/ds-core/src';
                  return isDist ? `${result}${rest}` : `${result}/js`;
                },
              },
              {
                original: '@synerise/ds-((?!core|icon)[a-z0-9-]+)(/dist)?(.*)',
                replacement: '@synerise/ds-$1/src$3',
              },
            ],
          },
        ],
      ])
    }
    
    config.module = {
      ...(config.module || {}),
      rules: [
        ...(config.module?.rules || []),
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-react-app'],
                plugins: plugins
              },
            },
          ],
        },
        {
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
        }
      ]
    };
    
    config.resolve = {
      ...(config.resolve || {}),
      extensions: [
        ...(config.resolve?.extensions || []),
        '.ts',
        '.tsx'
      ],
      plugins: [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          configFile: '../../config/typescript/tsconfig.base.json',
          extensions: config.resolve?.extensions,
          baseUrl: '../../'
        }),
      ],
      alias: {
        ...(config.resolve?.alias || {}),
        '@': resolve(__dirname, '../../components')
      }
    }
    
    return config;
  },
};
export default config;
