module.exports = {
  extends: [
    'react-app',
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    eqeqeq: [2, 'smart'],
    'no-console': 'warn',
    camelcase: 'off',
    'no-eval': 'error',
    'import/first': 'error',
  },
}
