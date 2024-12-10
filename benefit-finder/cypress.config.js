const { defineConfig } = require('Cypress')

module.exports = defineConfig({
  experimentalWebKitSupport: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://localhost:6006',
    excludeSpecPattern: 'cypress/e2e/usagov-public-site/*.cy.js',
    setupNodeEvents(on) {
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
})
