// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-e7d49.firebaseapp.com",
    projectId: "reactchat-e7d49",
    storageBucket: "reactchat-e7d49.firebasestorage.app",
    messagingSenderId: "386137649428",
    appId: "1:386137649428:web:87b0e915a1adcbacb8d201"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth()
export const db=getFirestore()