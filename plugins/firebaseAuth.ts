import { initializeApp, getApps, getApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig =  {
    apiKey: config.FIREBASE_API_KEY,
    projectId: "just-tap-cards",
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
});