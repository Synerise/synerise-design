/** @type {{replacements: [{original: string; replacement: (...args) => string}]}} */
const config = {
  replacements: [
    {
      original: '@synerise/ds-core(/dist)?(.*)',
      replacement: (importName, isDist, rest) => {
        let result = '@synerise/ds-core/src';
        return isDist ? `${result}${rest}` : `${result}/js`;
      },
    },
    {
      original: '@synerise/ds-((?!core|icon)[a-z0-9-]+)(/dist)?(/src)?(.*)',
      replacement: '@synerise/ds-$1/src$4',
      // replacement: '@synerise/ds-$1$3',
    },
  ],
};

module.exports = {
  babelPluginTransformRenameImport: [
    'transform-rename-import',
    // /** @type {import('babel-plugin-transform-rename-import/lib/index')} */
    config,
  ]
}
