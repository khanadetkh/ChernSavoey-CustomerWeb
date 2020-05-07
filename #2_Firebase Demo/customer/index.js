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

var docRef = firestore.doc("/Store/gixXindVOCKg6KqqD9MY");
var table = document.querySelector('#tbresult');

docRef.get().then(function(snapshot){
    snapshot.forEach(function(doc){
        showStore(doc);
    });
});




function showStore (doc) {
    var row = table.insertRow(-1);
    var cell1 = table.insertCell(0);
    var cell2 = table.insertCell(1);
    var cell3 = table.insertCell(2);
    cell1.innerHTML = doc.data().address;
    cell1.innerHTML = doc.data().geopoint;
    cell1.innerHTML = doc.data().storeID;
    cell1.innerHTML = doc.data().storeIMG;
    cell1.innerHTML = doc.data().storeName;
}