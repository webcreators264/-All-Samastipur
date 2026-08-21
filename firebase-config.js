// ==========================================
// ALL SAMASTIPUR
// FIREBASE CONFIG
// ==========================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  update,
  onValue,
  push
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-database.js";


const firebaseConfig = {

  apiKey:
    "AIzaSyCcaADTLXm-UEIjQlgsq3zntpXcZZ3h4v8",

  authDomain:
    "all-samastipur.firebaseapp.com",

  projectId:
    "all-samastipur",

  storageBucket:
    "all-samastipur.firebasestorage.app",

  messagingSenderId:
    "731332314428",

  appId:
    "1:731332314428:web:fb0b4bdb9ee3cbc74a8a39",

  measurementId:
    "G-13W0M5QYHJ"

};


// Firebase App

const app =
  initializeApp(firebaseConfig);


// Realtime Database

const database =
  getDatabase(app);


// IMPORTANT:
// Export database and Firebase functions

export {
  app,
  database,
  ref,
  set,
  get,
  update,
  onValue,
  push
};


console.log(
  "✅ All Samastipur Firebase Connected!"
);
