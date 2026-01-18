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
// Example tasks
const tasks = [
  {name: "Watch YouTube Video", BV: 10, IP: 1},
  {name: "Play Game", BV: 20, IP: 2},
  {name: "Download App", BV: 15, IP: 1}
];

// Render tasks dynamically
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const uid = user.uid;
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const div = document.createElement("div");
      div.style.marginBottom = "15px";
      div.innerHTML = `
        <p>${task.name}</p>
        <button onclick="completeTask('${uid}','${task.name}',${task.BV},${task.IP})">
          Complete Task
        </button>
      `;
      taskList.appendChild(div);
    });
  } else {
    window.location.href = "login.html";
  }
});

// Complete Task function
function completeTask(userId, taskName, BV, IP) {
  // Mark task as completed
  firebase.database().ref('users/' + userId + '/tasks/' + taskName).set('completed');

  // Update BV, IP and Level
  firebase.database().ref('users/' + userId).transaction(user => {
    if(user){
      user.BV += BV;
      user.IP += IP;
      // Auto level
      if(user.IP >= 3600) user.level = 8;
      else if(user.IP >= 1800) user.level = 7;
      else if(user.IP >= 600) user.level = 6;
      else if(user.IP >= 160) user.level = 5;
      else if(user.IP >= 40) user.level = 4;
      else user.level = 3;
    }
    return user;
  });

  alert(taskName + " Completed!"); 
}
