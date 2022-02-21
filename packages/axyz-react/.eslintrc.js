module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: ['prettier', 'react-hooks'],
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/function-component-definition': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-exports': 0,
    'react/require-default-props': 0,
  },
  overrides: [
    {
      parserOptions: {
        project: './tsconfig.json',
      },
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['airbnb-typescript', 'prettier'],
      rules: {},
    },
  ],
};
