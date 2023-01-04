// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYUdc6Y0NnRDiQk6fb-GH_gRnDdRchLWU",
  authDomain: "practiceapp-f8fa2.firebaseapp.com",
  databaseURL: "https://practiceapp-f8fa2-default-rtdb.firebaseio.com",
  projectId: "practiceapp-f8fa2",
  storageBucket: "practiceapp-f8fa2.appspot.com",
  messagingSenderId: "685625119976",
  appId: "1:685625119976:web:d4c074d7895a242e93e55d",
  measurementId: "G-F3VGGJ6R78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();
var doctorId = localStorage.getItem("doctorId");
console.log(doctorId);

var name = document.getElementById("name");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var location = document.getElementById("location");
var email = document.getElementById("email");
var message = document.getElementById("message");

var doctorObj = {};

function getDoctorDetail() {
  const reference = ref(db, `users/${doctorId}`);
  onValue(reference, function (dt) {
    console.log(dt.val());
    doctorObj = dt.val();
    name.innerHTML = doctorObj.name;
    startTime.innerHTML = doctorObj.startTime;
    endTime.innerHTML = doctorObj.endTime;
    location.innerHTML = doctorObj.location;
    email.innerHTML = doctorObj.email;
  });
}

getDoctorDetail();

window.sendFeedback = function () {
  var obj = {
    message: message.value,
    time: JSON.stringify(new Date()),
  };
  console.log(obj);

  const idRef = ref(db, `users/${doctorId}/feedback/`);
  obj.id = push(idRef).key;

  console.log(obj.id);
  const reference = ref(db, `users/${doctorId}/feedback/${obj.id}`);
  set(reference, obj);
};

// localStorage.setItem(
//   "arr",
//   JSON.stringify([
//     { id: 1, name: "ABC" },
//     { id: 1, name: "ABC" },
//     { id: 1, name: "ABC" },
//   ])
// );

// var arr = JSON.parse(localStorage.getItem("arr"));

// console.log(arr);
localStorage.removeItem("arr");
