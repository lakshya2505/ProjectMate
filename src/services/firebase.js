import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBP8G1P3cZkOiTDvoRx-wx1KkVNX28A3Y",
  authDomain: "projectmate-1fb9c.firebaseapp.com",
  projectId: "projectmate-1fb9c",
  storageBucket: "projectmate-1fb9c.firebasestorage.app",
  messagingSenderId: "129919117396",
  appId: "1:129919117396:web:abd9cdb0fed6ce998525c1",
  measurementId: "G-6XH4MH2CHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and Export
export const auth = getAuth(app); 
export const db = getFirestore(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
// This forces the "Select Account" popup every time (good for testing)
googleProvider.setCustomParameters({ prompt: 'select_account' });