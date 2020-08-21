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


//ตั้งค่าตัวแปร #=id idตัวที่อยู่ในindex
  const docRef = firestore.doc("sample/sandwichData"); //ตั้งค่่าชื่อของcollection/document
  const outputHeader = document.querySelector("#hotDogOutput");
  const inputTextField = document.querySelector("#latesthotDogOutput");
  const saveButton = document.querySelector("#saveButton");
  const loadButton = document.querySelector("#loadButton");

//อารมณ์เหมือนสร้าง Medtod ในการทำงาน
//Medthod 1
  saveButton.addEventListener("click", function(){
      const textTosave = inputTextField.value;
      console.log("I'm going to save" + textTosave + "to Firestore");
      docRef.set({
          hotdogStatus: textTosave
      }).then(function(){
console.log("Status Saved!");
      }).catch(function (error){
          console.log("Got an Error: ",error);
      });
    });

//Medthod2
loadButton.addEventListener("click", function(){
    docRef.get().then(function(doc){
     if (doc && doc.exists) {
         const myData = doc.data();
         outputHeader.innerText = "Hot Dog status: " + myData.hotdogStatus;
     }   
    }).catch(function (error){
        console.log("Got an Error: ",error);
    });
});

getRealtimeUpdate = function () {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            console.log("Check out this document I received", doc);
            outputHeader.innerText = "Hot Dog status: " + myData.hotdogStatus;
        }   
    })
}
