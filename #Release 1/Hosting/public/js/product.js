//Firebase Auth
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

//global
var products =[];
var cartItems= [];
var cart_n= document.getElementById('cart_n');

if (localStorage.getItem('positions')) {
    var positions= [JSON.parse(localStorage.getItem('positions'))];
} else {
    var positions=[];
}

//DIVS
var fruitDIV = document.getElementById('fruitDIV');
var juiceDIV = document.getElementById('juiceDIV');
var saladDIV = document.getElementById('saladDIV');

//INFORMATION
var FRUIT= [
    
  {
    id: 1,
    img: 'images/food/brownsugar.jpg',
    name: 'Brown Sugar',
    price: 35,
    cart: false,
    quantity: 1,
    total: 0

},
{
    id: 2,
    img: 'images/food/thaitea.jpg',
    name: 'ชาไทยเย็นปั่น + ไข่มุก',
    price: 25,
    cart: false,
    quantity: 1,
    total: 0
},
{
    id: 3,
    img: 'images/food/coffee.jpg',
    name: 'กาแฟปั่น + ไข่มุก',
    price: 25,
    cart: false,
    quantity: 1,
    total: 0

}



];

//HTML
function HTMLfruitProduct(con) {
    let btn= `btnFruit${con}`;
    if (FRUIT[con-1].cart) {
        return `
        <div class="col s12 m4 fadeInUp data-wow-delay="3s"  data-wow-offset="300" ">
            <div class="card">
                <div class="card-image">
                    <img src="${FRUIT[con-1].img}">
                    <a onclick="alertCart()" class="btn-floating halfway-fab waves-effect waves-light green">
                        <i class="material-icons">shopping_cart</i>
                    </a>
                </div>
                <div class="card-content">
          <i style="color:orange;" class="fa fa-star"  ></i>
          <i style="color:orange;" class="fa fa-star"  ></i>
          <i style="color:orange;" class="fa fa-star"  ></i>
          <i style="color:orange;" class="fa fa-star"  ></i>
          <i style="color:orange;" class="fa fa-star"  ></i>
          <span class="card-title">${FRUIT[con-1].name}</span>
          <p>Price: $${FRUIT[con-1].price}.00</p>
         
          </div>
            </div>
        </div>    
        `
    }else{
        return `
        <div class="col s12 m4 fadeInUp data-wow-delay="3s"  data-wow-offset="300" ">
        <div class="card">
          <div class="card-image">
            <img src="${FRUIT[con-1].img}">
            
            <a id="${btn}" onclick="cart('${FRUIT[con-1].id}','${FRUIT[con-1].cart}','${FRUIT[con-1].img}','${FRUIT[con-1].quantity}','${FRUIT[con-1].total}','${FRUIT[con-1].name}','${FRUIT[con-1].price}','${btn}')" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
            <a id="${btn}alert" style="display:none" onclick="alertCart()" class="btn-floating halfway-fab waves-effect waves-light green"><i class="material-icons">shopping_cart</i></a>
          </div>
          <div class="card-content">
          <span class="card-title">${FRUIT[con-1].name}</span>
          <p>Price: $${FRUIT[con-1].price}.00</p>
         
          </div>
        </div>
      </div>
        `
    }
}

  //ANIMATION 
  function animation(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    
    Toast.fire({
      icon: 'success',
      title: 'Added to shopping cart'
    })
  
      
  }
  //Alert Cart
  function alertCart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    
    Toast.fire({
      icon: 'info',
      title: 'Product already added to shopping cart'
    })
  }
  // CART FUNCTIONS
  function cart(id,cart,img,quantity,total,name,price,btncart){
      var item={
        id:id,cart:true,img:img,quantity:quantity,total:total,name:name ,price:price
      }
      positions.push(id);
      localStorage.setItem("positions",JSON.stringify(positions));
      cartItems.push(item);
      let storage= JSON.parse(localStorage.getItem("cart"));
      if (storage==null) {
              products.push(item);
              localStorage.setItem("cart",JSON.stringify(products));
      } else {
          products= JSON.parse(localStorage.getItem("cart"));
          products.push(item);
          localStorage.setItem("cart",JSON.stringify(products));
      }
      products= JSON.parse(localStorage.getItem("cart"));
      cart_n.innerHTML=`[${products.length}]`;
      document.getElementById(btncart).style.display="none";
      document.getElementById(btncart+'alert').style.display="block";
      animation();
  }
  
  //RENDER
  $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
    $(document).ready(function(){
      $('.modal').modal();
    });
  function render(){
    new WOW().init();
    if (localStorage.getItem('positions')) {
      var localProductsCart = JSON.parse(localStorage.getItem('positions'));
    } else {
      var localProductsCart = [];
      localStorage.setItem('positions',JSON.stringify(localProductsCart));
      var localProductsCart = JSON.parse(localStorage.getItem('positions'));
    }
      
      for (let index = 0; index < localProductsCart.length; index++) {
         //FRUIT
        for (let index2 = 0; index2 < FRUIT.length; index2++) {
              if (localProductsCart[index] == FRUIT[index2].id) {
                  FRUIT[index2].cart= true;
                  
              }else{
               
              }
          }
       
      
      
        }
  
  
      for (let index = 1; index <= 4; index++) {
        fruitDIV.innerHTML+=`${HTMLfruitProduct(index)}`;
      }
      if (localStorage.getItem("cart")==null) {
          
      } else {
          products=JSON.parse(localStorage.getItem("cart"));
          cart_n.innerHTML=`[${products.length}]`;
      }
  
  }