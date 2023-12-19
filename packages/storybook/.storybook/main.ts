import type { StorybookConfig } from '@storybook/react-webpack5';
import { join, dirname, resolve } from 'path';


/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
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
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // By default react-doc-gen-typescript filters node_modules type, this includes antd types
      tsconfigPath: '../../config/typescript/tsconfig.base.json',
      propFilter: (prop: any) => {
        const res = /antd/.test(prop.parent?.fileName) || !/node_modules/.test(prop.parent?.fileName);
        return prop.parent ? res : true;
      },
      // The following 2 options turns string types into string literals and allows
      shouldExtractLiteralValuesFromEnum: true,
      savePropValueAsString: true,
    },
    // skipCompiler: true,
    // check: false,

  },
  staticDirs: ['../public'],
  async webpackFinal(config, { configType }) {
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
                plugins: configType !== 'PRODUCTION' ? [[
                  'transform-rename-import',
                    {
                      replacements: [
                        {
                          original: '@synerise/ds-core(/dist)?(.*)',
                          replacement: (_importName, isDist, rest) => {
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
                  ]] : []
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
      ]
    }
    return config;
  },
};
export default config;
