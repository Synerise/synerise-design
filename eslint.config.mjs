import eslintConfig from '@synerise/eslint-config';
import { defineConfig } from "eslint/config";


const testFiles = ['**/*.spec.*', '**/__specs__/**'];

export default defineConfig([
  ...eslintConfig,
  {
    ignores: [
      'node_modules/',
      '**/node_modules/',
      '**/dist/',
      '.cache',
      'scripts/*',
      '*.config.js',
      '**/*.config.js',
      'config/',
      '**/core/build/',
      '**/flag/build/',
      '**/flag/src/icons/',
      '**/icon/build/',
      '**/icon/src/icons/',
      'packages/storybook/',
      ...testFiles
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
]);
