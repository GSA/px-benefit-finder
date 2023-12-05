const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: "$CYPRESS_baseUrl",
    env: {
      authUsername: "$storybook_username",
      authPassword: "$storybook_password",
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
