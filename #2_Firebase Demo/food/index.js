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


var firestore = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();


firestore.collection('Menu').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        //document.getElementById("foodIMG").innerHTML = doc.data().foodIMG;
        document.getElementById("foodName").innerHTML = doc.data().foodName;
        document.getElementById("foodDes").innerHTML = doc.data().foodDescription;
        document.getElementById("foodPrice").innerHTML = "Price: " + doc.data().foodPrice + " ฿";
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});

