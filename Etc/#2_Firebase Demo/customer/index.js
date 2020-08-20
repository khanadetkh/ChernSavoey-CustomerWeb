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
const table = document.querySelector('#tbresult');


firestore.collection('Store').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        showStore(doc);
    });
});




function showStore(doc) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = doc.data().storeIMG;
    cell2.innerHTML = doc.data().storeName;
    let btn = document.createElement('button');
    btn.textContent = 'Enter';
    btn.setAttribute('class', 'btn btn-primary');
    cell3.appendChild(btn);


}


