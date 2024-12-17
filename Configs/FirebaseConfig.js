// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "altium-cd024.firebaseapp.com",
    projectId: "altium-cde24",
    storageBucket: "altium-cd024.appspot.com",
    messagingSenderId: "904813905259",
    appId: "1:904813905259:web:f1bb555fdb05b18022382e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);