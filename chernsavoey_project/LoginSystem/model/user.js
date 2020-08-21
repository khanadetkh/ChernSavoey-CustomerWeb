// -- Model

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

//Start Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDiLRSKZJU8F5UhTFHmMyHa0qB1CAzMuLw",
    authDomain: "it60-42-choen-savoey.firebaseapp.com",
    databaseURL: "https://it60-42-choen-savoey.firebaseio.com",
    projectId: "it60-42-choen-savoey",
    storageBucket: "it60-42-choen-savoey.appspot.com",
    messagingSenderId: "208922727243",
    appId: "1:208922727243:web:45cb03e5d2eebb8a948ece",
    measurementId: "G-0KGMXHYKEJ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



