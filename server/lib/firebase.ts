import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAF2TateJZxI-_-whF8eBcuK1NTYWm6OW0",
  authDomain: "just-tap-cards.firebaseapp.com",
  projectId: "just-tap-cards",
  storageBucket: "just-tap-cards.appspot.com",
  messagingSenderId: "876543061009",
  appId: "1:876543061009:web:0a9cc4aa6ee0e9810395b0",
  measurementId: "G-WLLC5813ML"
};

const app = initializeApp(firebaseConfig);

export const fire = getFirestore(app);
export const fireAuth = getAuth(app);
