const { packages } = require('./lerna.json');

module.exports = api => {
  const isTest = api.env('test');

  let ignore = ['**/dist/'];

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
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
