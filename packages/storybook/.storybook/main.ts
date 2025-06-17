import type { StorybookConfig } from '@storybook/react-webpack5';
import { join, dirname } from 'path';
import deeperSortSetup from "storybook-deeper-sort";

deeperSortSetup(
  ["Introduction", "Tokens", "Components", ["*", "Tests"]],
);

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('storybook-addon-pseudo-states'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    defaultName: 'Overview'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: '../../config/typescript/tsconfig.base.json',
      propFilter: (prop: any) => {
        const res = !/@types\/react/.test(prop.parent?.fileName);
        return prop.parent ? res : true;
      },
      shouldExtractLiteralValuesFromEnum: true,
      savePropValueAsString: true,
    },
    check: false,
  },
  staticDirs: ['../public'],
  async webpackFinal(config) {
    config.module = {
      ...(config.module || {}),
      rules: [
        ...(config.module?.rules?.filter((f) => f?.test?.toString() !== '/\\.mdx$/') || []),
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.mdx$/,
          use: ['@mdx-js/loader'],
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['babel-preset-react-app'],
                plugins: [
                  [
                    'transform-rename-import',
                    {
                      replacements: [
                        {
                          original: '@synerise/ds-((?!core|data-format|toaster|icon$|icon/)[a-z0-9-]+)(/dist)?(.*)',
                          replacement: '@synerise/ds-$1/src$3',
                        },
                      ],
                    },
                  ],
                ],
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
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    };

    config.resolve = {
      ...(config.resolve || {}),
      extensions: [...(config.resolve?.extensions || []), '.ts', '.tsx'],
    };
    return config;
  },
};
export default config;
