const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: '$CYPRESS_baseUrl',
    env: {
      authUsername: '$CYPRESS_username',
      authPassword: '$CYPRESS_password',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
})
