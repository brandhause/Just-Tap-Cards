export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],
  script: [
    {
      src: 'bootstrap/dist/js/bootstrap.bundle.min.js'
    }
  ],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    }
  },
});