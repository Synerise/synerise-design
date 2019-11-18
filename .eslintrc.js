const IGNORE = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'standard',
    'standard-react',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['jest', 'react', 'react-hooks'],
  env: {
    'jest/globals': true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'react-hooks/exhaustive-deps': WARNING,
    'react-hooks/rules-of-hooks': ERROR,
    'react/jsx-no-bind': [IGNORE],
    'import/extensions': [IGNORE],
    'react/jsx-fragments': [WARNING, 'syntax'],
    'react/jsx-filename-extension': [IGNORE],
    'react/state-in-constructor': [WARNING, 'never'],
    'import/no-extraneous-dependencies': [IGNORE],
    'import/no-unresolved': [IGNORE],
    '@typescript-eslint/explicit-function-return-type': ERROR,
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/static-property-placement': 'off',
      },
    },
  ],
};
