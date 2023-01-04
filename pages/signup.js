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

var name = document.getElementById("name");
var email = document.getElementById("email");
var password = document.getElementById("password");
var startTime = document.getElementById("startTime");
var endTime = document.getElementById("endTime");
var category = document.getElementById("category");
var location = document.getElementById("location");

window.signUpUser = function () {
  var obj = {
    name: name.value,
    email: email.value,
    password: password.value,
    category: category.value,
    startTime: startTime.value,
    endTime: endTime.value,
    location: location.value,
  };
  console.log(obj);

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log(res.user.uid);
      obj.id = res.user.uid;
      const reference = ref(db, `users/${res.user.uid}/`);

      set(reference, obj)
        .then(function () {
          console.log("User Created Succesfully");
          window.location.assign("../index.html");
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
};
