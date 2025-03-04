module.exports = {
  e2e: {
    specPattern: 'cypress/integration/**/*.js',
    baseUrl: 'https://multi-game-app.vercel.app/', // Reemplaza con la URL de tu aplicación en Vercel
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
