const { packages } = require('./lerna.json');

module.exports = api => {
  const isTest = api.env('test');

  let ignore = ['**/dist/!(es)'];

  if (!isTest) ignore = ignore.concat(['**/__specs__/', '**/__stories__/']);

  return {
    babelrcRoots: ['.', ...packages],
    ignore,

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
