const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:6006',
    excludeSpecPattern: 'cypress/e2e/usagov-public-site/*.cy.js',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
