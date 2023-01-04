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

var parent = document.getElementById("parent");

var doctorsList = [];

function renderDoctorList() {
  parent.innerHTML = "";
  for (var i = 0; i < doctorsList.length; i++) {
    parent.innerHTML += `<div onclick="moveDoctorPage('${doctorsList[i].id}')" class="col-md-4 my-2">
        <div class="p-3 text-center rounded shadow">
          <h2>Dr ${doctorsList[i].name}</h2>
          <p>Timing: ${doctorsList[i].startTime} - ${doctorsList[i].endTime}</p>
          <p>Location: ${doctorsList[i].location}</p>
        </div>
      </div>`;
  }
}

function getDoctorList() {
  const reference = ref(db, "users/");
  onChildAdded(reference, function (dt) {
    doctorsList.push(dt.val());
    console.log(doctorsList);
    renderDoctorList();
  });
}
getDoctorList();

window.moveDoctorPage = function (doctorId) {
  console.log(doctorId);
  localStorage.setItem("doctorId", doctorId);
  window.location.assign("pages/doctor.html");
};
