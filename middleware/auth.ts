import { onAuthStateChanged } from 'firebase/auth';

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const auth = window.localStorage.getItem('profiles');
    if (!auth) {
      return navigateTo('/')
    }
  }
});