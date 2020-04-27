 // Initialize Firebase
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
    firebase.initializeApp(firebaseConfig);



function Googlelogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        window.location = "login.html";
        // ...
      }).catch(function(error) {
        var errorMessage = error.message;
alert(errorMessage);
      });

}

