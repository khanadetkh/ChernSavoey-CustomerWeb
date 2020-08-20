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

var products = [
    {
        id: 1,
        img: 'images/lungnhom.jpg',
        name: 'ลุงหนุ่ม Squre',

    },
    {
        id: 2,
        img: 'images/khongtod.jpg',
        name: 'ร้านของทอด',
    },
    {
        id: 3,
        img: 'images/bbtea.jpg',
        name: 'ร้านน้ำ',
    }


];




(() => {
    for (let index = 0; index < products.length; index++) {
        document.getElementById('row1').innerHTML += `
      <div class="card m-2 " style="width: 18rem;" >
      <img src="${products[index].img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${products[index].name}</h5>
            <a  href="products.html">  <button class="btn btn-primary">
            See More</button> </a>
      </div>
    </div>
      `
    }
})();