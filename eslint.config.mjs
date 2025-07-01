import eslintConfig from '@synerise/eslint-config';

export default [
  ...eslintConfig,
  {
    ignores: [
      'node_modules/',
      '**/node_modules/',
      '**/dist/',
      '.cache',
      'scripts/',
      '*.config.js',
      '**/*.config.js',
      '*.spec.*',
      'config/',
      '**/core/build/',
      '**/flag/build/',
      '**/flag/src/icons/',
      '**/icon/build/',
      '**/icon/src/icons/',
      'packages/storybook/',
      '__specs__',
    ],
  },
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      'no-duplicate-imports': 'warn',
      'import/no-duplicates': 'warn',
    },
  },
];
