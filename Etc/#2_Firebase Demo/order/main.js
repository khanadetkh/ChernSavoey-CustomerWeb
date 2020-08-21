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

  function buy() {
      var productsFirebase=[];
      for (let index = 0; index < products.length; index++) {
         if (products[index].cart) {
            var product={
                name: products[index].name,
                price: products[index].price,
                quantity: products[index].quantity,
                total: products[index].total,
            }
            productsFirebase.push(product);
         }
          
      }
    firebase.firestore().collection('cart').add({
        total:total(),
        products: productsFirebase
    });
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Operation Completed!',
       
      })
    clean();

}

var products = [
    {
        id:1,
        img:'./fruit1.jpeg',
        name:'Apple',
        price:3,
        cart:false,
        quantity:1,
        total:0
       
    },
    {
        id:2,
        img:'./fruit2.jpeg',
        name:'Orange',
        price:4,
        cart:false,
        quantity:1,
        total:0
    },
    {
        id:3,
        img:'./fruit3.jpeg',
        name:'Banana',
        price:5,
        cart:false,
        quantity:1,
        total:0
      
    }
];
function total() {
    let total=0;
    for (let index = 0; index < products.length; index++) {
       if (products[index].cart) {
        total+=products[index].total;
       } 
        
    }
    return total
}
var con=0;
var con2=[]; //POSITION AT TABLE
function clean() {
    for (let index = 0; index < products.length; index++) {
           products[index].total=0;
           products[index].quantity=1;
           products[index].cart=false;
           con2=[];
           updateCart();
     }
    
}
function add(id) {
   

   for (let index = 0; index < products.length; index++) {
    if (products[index].id != id || products[index].cart==true) {
       
    } else {
     products[index].cart=true;
     con2.push(products[index].id);
     console.log(con2)
     document.getElementById('tableProducts').innerHTML+=`
     <tr>
    <th scope="row">${con+1}</th>
    <td><button class="btn btn-danger" onclick="remove(${products[index].id})">X</button></td>
    <td><img style="width: 5rem;" src="${products[index].img}" ></td>
    <td>${products[index].name}</td>
    <td>
     <button class="btn btn-primary" onclick="reduceAmount(${products[index].id})">-</button>
     <input style="width: 2rem;" id="input${products[index].id}" value="${products[index].quantity}" disabled>
     <button class="btn btn-primary" onclick="addAmount(${products[index].id})" >+</button>
    </td>
    <td>$ ${products[index].price*products[index].quantity}.00</td>
     </tr>
    `
        con++;
       products[index].total=products[index].price*products[index].quantity
    }

    
    
    
   }
   
    
   document.getElementById('total').innerHTML=`
   <tr>
   <th scope="row"></th>
   <td></td>
   <td></td>
   <td></td>
   <td>
       <h4>Total:</h4>
   </td>
   <td>$ ${total()}.00</td>
    </tr>
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
 
    </td>
    <td>
      <button onclick="buy()"class="btn btn-success">Buy</button>
    </td>
     </tr>
   `
 
 
}
function remove(id) {
   
    for (let index = 0; index < products.length; index++) {
       if (products[index].id == id) {
            products[index].cart=false;
            products[index].total=0;
            products[index].quantity=1;
            total();
            for (let index2 = 0; index2 < con2.length; index2++) {
               if (products[index].id == con2[index2]) {
                   con2.splice(index2,1);
                   console.log(con2);
               } else {
                   
               }
                
            }

            updateCart();
       } else {
        updateCart();
       }
        
    }
}
function updateCart(){
    con= 0;
    var totalTable=0;
    document.getElementById('tableProducts').innerHTML='';
    for (let index = 0; index < con2.length; index++) {
        var position = con2[index];
        for (let index3 = 0; index3 < products.length; index3++) {
            
           if (position == products[index3].id) {
            console.log( 'ENCONTRADO: '+position +'  '+products[index3].id);
            document.getElementById('tableProducts').innerHTML+=`
            <tr>
           <th scope="row">${con+1}</th>
           <td><button class="btn btn-danger" onclick="remove(${products[index3].id})">X</button></td>
           <td><img style="width: 5rem;" src="${products[index3].img}" ></td>
           <td>${products[index3].name}</td>
           <td>
           <button class="btn btn-primary" onclick="reduceAmount(${products[index3].id})">-</button>
           <input style="width: 2rem;" id="input${products[index3].id}" value="${products[index3].quantity}" disabled>
           <button class="btn btn-primary" onclick="addAmount(${products[index3].id})" >+</button>
           </td>
           <td>$ ${products[index3].price*products[index3].quantity}.00</td>
            </tr>
            
           `
           products[index3].total=products[index3].price*products[index3].quantity
           } else {
               
           }
            
        }

       con=con+1;
     }
   if (total() == 0) {
    document.getElementById('total').innerHTML='';
   } else {
    document.getElementById('total').innerHTML=`
    <tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td>
        <h4>Total:</h4>
    </td>
    <td>$ ${total(totalTable)}.00</td>
     </tr>
     <tr>
     <th scope="row"></th>
     <td></td>
     <td></td>
     <td></td>
     <td>

     </td>
     <td>
       <button onclick="buy()" class="btn btn-success">Buy</button>
     </td>
      </tr>
    `
   }
}
function reduceAmount(id) {
        for (let index = 0; index < products.length; index++) {
            if (products[index].id == id) {
               if ( products[index].quantity > 1) {
                products[index].quantity=products[index].quantity-1;
                updateCart();
               } else {
                   
               }
            } else {
                
            }
            
        }
}
function addAmount(id) {
    for (let index = 0; index < products.length; index++) {
        if (products[index].id == id) {
           if ( products[index].quantity > 0) {
            products[index].quantity=products[index].quantity+1;
            updateCart();
           } else {
               
           }
        } else {
            
        }
        
    }
}

(()=>{
    for (let index = 0; index < products.length; index++) {
        document.getElementById('row1').innerHTML+=`
        <div class="card m-2" style="width: 10rem;">
        <img src="${products[index].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${products[index].name}</h5>
          <p class="card-text">$ ${products[index].price}.00</p>
          <button class="btn btn-primary" onclick="add('${products[index].id}')">Add</button>
        </div>
      </div>
        `
    }
})();