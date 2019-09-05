const scopes = require('@commitlint/config-lerna-scopes');

const prefix = 'ds-';

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'type-case': [2, 'always', ['lower-case', 'upper-case']],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'WIP'],
    ],
    'scope-enum': ctx =>
      scopes.rules['scope-enum'](ctx).then(([level, applicable, packages]) => [
        level,
        applicable,
        packages.map(pkg => (pkg.includes(prefix) ? pkg.replace(prefix, '') : pkg)).concat(['scripts']),
      ]),
  },
};
