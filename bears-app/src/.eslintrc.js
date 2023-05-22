module.exports = {
  extends: ['react-app', 'standard', 'plugin:prettier/recommended'],
  rules: {
    'react/prop-types': 'off',
    eqeqeq: [2, 'smart'],
    'no-console': 'warn',
    camelcase: 'off',
    'no-eval': 'error',
    'import/first': 'error',
  },
}
