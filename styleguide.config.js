const path = require('path');

module.exports = {
  title: 'Synerise Design System',
  components: './packages/components/**/*.tsx',
  assetsDir: './docs/assets',
  styleguideDir: './docs/dist',
  pagePerSection: true,
  usageMode: 'expand',
  verbose: true,
  skipComponentsWithoutExample: true,
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
          test: /\.(woff(2)?|ttf|eot|svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
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
