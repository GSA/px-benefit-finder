const { defineConfig } = require('cypress')

const authData = {
  authUsername: '{replace-with-auth-username}',
  authPassword: '{replace-with-auth-password}',
}

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://${authData.authPassword}-${authData.authUsername}-dev.app.cloud.gov`,
    env: {
      authUsername: authData.authUsername,
      authPassword: authData.authPassword,
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
