const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'o8rt21',
  e2e: {
    baseUrl: "https://app.superfluid.finance",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/task",
      html: false,
      overwrite: false
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
