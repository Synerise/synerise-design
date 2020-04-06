const path = require('path');
const resolve = require('resolve');

module.exports = {
  title: 'Synerise Design System',
  components: './packages/components/**/*.tsx',
  assetsDir: './docs/assets',
  styleguideDir: './docs/dist',
  pagePerSection: true,
  sections: [
    {
      name: 'Intro',
      content: './docs/intro.md',
    },
    {
      name: 'Pallete',
      content: './docs/palette.md',
    },
    {
      name: 'Components',
      components: () => ([
        './packages/components/Button/**/*.tsx',
        './packages/components/Avatar/**/*.tsx',
        './packages/components/Modal/**/*.tsx',
      ])
    },
    {
      name: 'Components #2',
      components: () => ([
        './packages/components/AppMenu/**/*.tsx',
        './packages/components/Badge/**/*.tsx',
      ])
    }
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(tsx|jsx|ts|js)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-react',
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                    },
                  ],
                  '@babel/preset-typescript',
                ],
                plugins: [
                  'babel-plugin-styled-components',
                  '@babel/plugin-proposal-object-rest-spread',
                  ['@babel/plugin-proposal-class-properties', { loose: true }],
                  [
                    'transform-rename-import',
                    {
                      replacements: [
                        {
                          original: '^(.+?)\\.jsx$',
                          replacement: '$1.js',
                        },
                      ],
                    },
                  ],
                ],
              }
            }
          ]
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
                javascriptEnabled: true
              }
            }]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            }]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|jpg|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              }
            }
          ]
        }
      ]
    }
  },
  ignore: ['**/*.styles.tsx', '**/*.spec.tsx', '**/utils/**/*', '**/*.types.tsx', '**/*.context.tsx', '**/icon/**/*', 'packages/components/**/dist/*.js'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'docs/components/Wrapper'),
  }
}
