import { dirname, join } from 'path';
import deeperSortSetup from 'storybook-deeper-sort';
import { addons } from 'storybook/manager-api';
import { fileURLToPath } from 'url';

import type { StorybookConfig } from '@storybook/react-webpack5';

deeperSortSetup(['Introduction', 'Tokens', 'Components', ['*', 'Tests']], {
  docsFirst: false,
});

function getAbsolutePath(value: string): string {
  const resolved = import.meta.resolve?.(join(value, 'package.json'));
  if (!resolved) {
    throw new Error(`Could not resolve ${value}`);
  }
  return dirname(fileURLToPath(resolved));
}
const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('storybook-addon-tag-badges'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('storybook-addon-pseudo-states'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  tags: {
    visualtests: { defaultFilterSelection: 'exclude' },
  },
  docs: {
    defaultName: 'Overview',
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
        ...(config.module?.rules?.filter(
          (f) => f?.test?.toString() !== '/\\.mdx$/',
        ) || []),
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
                          original:
                            '@synerise/ds-((?!core|icon$|icon/)[a-z0-9-]+)(/dist)?(.*)',
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
