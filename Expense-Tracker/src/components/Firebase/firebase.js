import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDub16p58nLg1xYkQTq1hOKcJnP0yKWpZE",
  authDomain: "expense-tracker-a04e2.firebaseapp.com",
  projectId: "expense-tracker-a04e2",
  storageBucket: "expense-tracker-a04e2.firebasestorage.app",
  messagingSenderId: "677312179491",
  appId: "1:677312179491:web:a2dde330168d5daa5c7096"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);