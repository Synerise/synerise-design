import type { StorybookConfig } from '@storybook/react-webpack5';
import { join, dirname, resolve } from 'path';
import { configureSort } from 'storybook-multilevel-sort';
import deeperSortSetup from "storybook-deeper-sort";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const MONACO_DIR = resolve(__dirname, '../../../node_modules/monaco-editor');

deeperSortSetup(
  ["Introduction", "Tokens", "Components", ["*", "Tests"]],
);
configureSort({
  typeOrder: ['docs', 'story'],
  storyOrder: {
    '**': {
      overview: null,
      default: null,
      
    },
  },
});

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('storybook-addon-pseudo-states'),
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
    defaultName: 'Overview',
    autodocs: 'tag',
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
    skipBabel: true,
    check: false,
  },
  staticDirs: ['../public'],
  async webpackFinal(config) {
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
                plugins: [
                  [
                    'transform-rename-import',
                    {
                      replacements: [
                        {
                          original: '@synerise/ds-((?!core|icon$|icon/)[a-z0-9-]+)(/dist)?(.*)',
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
                javascriptEnabled: true,
              },
            },
          ],
        },
        // @synerise/ds-code-area monaco editor
        {
          test: /\.ttf$/,
          include: MONACO_DIR,
          use: ['file-loader'],
        },
        {
          test: /\.js$/,
          include: MONACO_DIR,
          type: 'javascript/auto',
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { targets: 'defaults' }]],
                plugins: [
                  '@babel/plugin-transform-nullish-coalescing-operator',
                  '@babel/plugin-transform-optional-chaining',
                  '@babel/plugin-transform-class-static-block',
                ],
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
