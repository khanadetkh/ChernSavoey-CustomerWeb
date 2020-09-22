var express = require('express');
// const db = require('../model/db');
var router = express.Router();
var Cart = require('../model/cart');


router.post('/', function(req, res, next) {
   var products = Cart.getMenuItems
   var items = req.body.menuName;
   req.session.cart = req.session.cart || {};
   var cart = req.session.cart; //ตะกร้าสินค้า
   products.find({
     _id: items
   }, {}, function(err, product) {
     // กรณีซื้อชิ้นเดิมมากกว่า 1 ชิ้น
     if (cart[items]) {
       cart[items].qty++;
     } else {
       //ซื้อสินค้าครั้งแรก
       product.forEach(function(item) {
         cart[items] = {
           item: item._id,
           title: item.name,
           price: item.price,
           qty: 1
         }
       });
     }
     res.redirect('/cart');
   });
 });
 
 router.get('/', function(req, res, next) {
      //  var cart = req.session.cart; //ตะกร้าสินค้า
      //  var displayCart={items:[],total:0};
      //  var total=0;
      //  for(item in cart){
      //      displayCart.items.push(cart[item]);
      //      total+=(cart[item].qty * cart[item].price);
      //  }
      //  displayCart.total=total;
      //  res.render('cart',{cart:displayCart});
      res.render('cart');
 });

module.exports = router;