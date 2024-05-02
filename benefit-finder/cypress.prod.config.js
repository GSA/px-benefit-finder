const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.usa.gov',
    specPattern: 'cypress/e2e/usagov-public-site/*.cy.js',
    excludeSpecPattern: 'cypress/e2e/usagov-public-site/links.cy.js',
  },
})
