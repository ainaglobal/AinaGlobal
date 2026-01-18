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

// Register User Function
function registerUser() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const referral = document.getElementById("regReferral").value;

  if (!name || !email || !password) {
    alert("Please fill all required fields!");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save extra info in database
      firebase.database().ref("users/" + user.uid).set({
        name: name,
        email: email,
        referral: referral,
        BV: 0,
        IP: 0,
        level: 0,
        status: "Red",
        tasks: {},
        royalty: 0
      });

      alert("Registration Successful!");
      window.location.href = "../pages/login.html"; // Redirect to login
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}
// Firebase – Dashboard data fetch
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const uid = user.uid;
    firebase.database().ref("users/" + uid).once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        document.getElementById("dashName").innerText = data.name;
        document.getElementById("dashLevel").innerText = data.level;
        document.getElementById("dashBV").innerText = data.BV;
        document.getElementById("dashIP").innerText = data.IP;
        document.getElementById("dashStatus").innerText = data.status;
      });
  } else {
    // Agar user login nahi hai → login page
    window.location.href = "login.html";
  }
});
