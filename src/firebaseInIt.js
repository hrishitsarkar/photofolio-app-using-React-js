// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZV5a5p4gG5WZTL3Gq2jp0dSK0lg2s4fc",
  authDomain: "photofolio-6014d.firebaseapp.com",
  projectId: "photofolio-6014d",
  storageBucket: "photofolio-6014d.appspot.com",
  messagingSenderId: "133093845555",
  appId: "1:133093845555:web:911dc6f0c3044df10d5146"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);