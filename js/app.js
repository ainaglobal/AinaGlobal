// app.js
console.log("Aina Global app.js loaded");

const firebaseConfig = {
  apiKey: "AIzaSyC_smT0S6OHl4jqeNnXEgnlZgSY0h0wmyw",
  authDomain: "aina-global-7cb55.firebaseapp.com",
  projectId: "aina-global-7cb55",
  storageBucket: "aina-global-7cb55.firebasestorage.app",
  messagingSenderId: "992619542791",
  appId: "1:992619542791:web:168b4ccf4ea5adbdb4eda2"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

console.log("Firebase Connected");
