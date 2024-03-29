const { packages } = require('./lerna.json');

module.exports = api => {
  const isTest = api.env('test');

  let ignore = ['**/dist/!(es)'];

  if (!isTest) ignore = ignore.concat(['**/__specs__/', '**/__stories__/']);

  return {
    babelrcRoots: ['.', ...packages],
    ignore,
    env: {
      cjs: {
        presets: [
          [
            '@babel/env',
            {
              targets: {
                node: 6,
              },
              useBuiltIns: 'usage',
            },
          ],
        ],
      },
    },
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          modules: false,
          loose: true,
        },
      ],
      '@babel/preset-typescript',
    ],

    plugins: [
      'babel-plugin-styled-components',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      [
        'transform-rename-import',
        {
          replacements: [
            {
              original: '^(.+?)\\.jsx$',
              replacement: '$1.js',
            },
            {
              original: '^(.+?)\\.less$',
              replacement: '$1.css',
            },
          ],
        },
      ],
    ],
  };
};
