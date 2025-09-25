const workspaceScopes = require('@commitlint/config-workspace-scopes');

const { getPackages } = workspaceScopes.default.utils;

const prefix = 'ds-';

module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-workspace-scopes'],
  rules: {
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'type-case': [2, 'always', ['lower-case', 'upper-case']],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'WIP'],
    ],
    'scope-enum': async ctx => {
      const packages = await getPackages(ctx); // workspace package names
      const normalized = packages.map(pkg =>
        pkg.startsWith(prefix) ? pkg.slice(prefix.length) : pkg
      );
      return [2, 'always', [...normalized, 'scripts']];
    },
  },
};