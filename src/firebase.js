// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCCZhArTbZxg6_nzBaNq-J4-8nmhusKt64",
  authDomain: "space-chat-f9b51.firebaseapp.com",
  projectId: "space-chat-f9b51",
  storageBucket: "space-chat-f9b51.appspot.com",
  messagingSenderId: "245611000815",
  appId: "1:245611000815:web:daaf85f1bc3b02ebae7c1a",
  measurementId: "G-34JCCQM7BD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
