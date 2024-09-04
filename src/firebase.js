import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC47wq-XeSwc4pzdKBPRFG1P4xK6VhfJCw",
  authDomain: "office-meal-app.firebaseapp.com",
  projectId: "office-meal-app",
  storageBucket: "office-meal-app.appspot.com",
  messagingSenderId: "484233093884",
  appId: "1:484233093884:web:a9a773fd55f15dc1a4ed79",
  measurementId: "G-ER4KGGCT2X",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
