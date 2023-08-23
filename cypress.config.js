
module.exports = {
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*",
    setupNodeEvents(on, config) {
     
    },
  },

  testingType: "e2e",

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
};
