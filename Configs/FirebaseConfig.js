// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wheeldeal-104bc.firebaseapp.com",
  projectId: "wheeldeal-104bc",
  storageBucket: "wheeldeal-104bc.firebasestorage.app",
  messagingSenderId: "38298053930",
  appId: "1:38298053930:web:3936d4ea70ea6bbdf9c253",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
