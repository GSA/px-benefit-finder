/* eslint-disable no-console */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:6006',
    excludeSpecPattern: 'cypress/e2e/usagov-public-site/*.cy.js',
    defaultCommandTimeout: 8000,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
        table(message) {
          console.table(message)

          return null
        },
      })
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})
