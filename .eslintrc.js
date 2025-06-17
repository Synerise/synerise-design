const IGNORE = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    'jest/globals': true,
  },
  extends: ['airbnb', 'standard', 'standard-react', 'prettier', 'prettier/flowtype', 'prettier/react', 'prettier/standard', 'plugin:jest/recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['jest', 'react', 'react-hooks'],
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
    'import/prefer-default-export': [IGNORE],
    'react/jsx-props-no-spreading': [IGNORE],
    'no-use-before-define': IGNORE,
    'no-shadow': IGNORE,
    'no-shadow-restricted-names': WARNING,
    "no-unused-expressions": IGNORE,
    '@typescript-eslint/ban-types': IGNORE,
    '@typescript-eslint/ban-ts-comment': IGNORE,
    '@typescript-eslint/explicit-module-boundary-types': IGNORE,
    '@typescript-eslint/explicit-function-return-type': IGNORE,
    '@typescript-eslint/no-unused-vars': [ERROR, { ignoreRestSiblings: true }],
    '@typescript-eslint/no-shadow': ERROR,
    '@typescript-eslint/no-unused-expressions': [
    ERROR,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
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
