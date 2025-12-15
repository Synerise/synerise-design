const workspaceScopes = require('@commitlint/config-pnpm-scopes');

const { getProjects } = workspaceScopes.default.utils;

const DS_PREFIX = 'ds-';

module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-pnpm-scopes'],
  rules: {
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
    'type-case': [2, 'always', ['lower-case', 'upper-case']],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'WIP'],
    ],
    'scope-enum': async ctx => {
      const packages = await getProjects(ctx); 
      const normalized = packages.map(pkg =>
        pkg.startsWith(DS_PREFIX) ? pkg.slice(DS_PREFIX.length) : pkg
      );
      return [2, 'always', [...normalized, 'scripts']];
    },
  },
};