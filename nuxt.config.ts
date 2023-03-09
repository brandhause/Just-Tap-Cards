export default defineNuxtConfig({
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap'
      }
    ]
  },
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