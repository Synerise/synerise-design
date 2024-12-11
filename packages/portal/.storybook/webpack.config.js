const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const MONACO_DIR = path.resolve(__dirname, '../../../node_modules/monaco-editor');

module.exports = async ({ config, mode }) => {
  config.resolve.alias['@'] = path.resolve(__dirname, '../../components');

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
  
  // @synerise/ds-code-area monaco editor
  config.module.rules.push({
    test: /\.ttf$/,
    include: MONACO_DIR,
    use: ['file-loader'],
  });

  config.module.rules.push({
    test: /\.js$/,
    include: MONACO_DIR,
    type: 'javascript/auto',
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: 'defaults',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-transform-optional-chaining',
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-nullish-coalescing-operator',
            '@babel/plugin-transform-class-static-block',
          ],
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
          plugins: []
            .concat(
              process.env['STORYBOOK_REPO_URL_PREFIX'] || process.env['STORYBOOK_BUNDLE_DS_SRC_DOCS_LINKS']
                ? [require('@synerise/portal-plugin-docs-inline-stories-links-to-sources').addLinksToStories]
                : []
            )
            .concat(
              mode === 'PRODUCTION'
                ? []
                : [
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
                  ]
            ),
        },
      },
    ],
  });

  config.plugins.push(new MonacoWebpackPlugin({languages: ['typescript', 'json', 'javascript', 'css', 'html', 'python']}));
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
