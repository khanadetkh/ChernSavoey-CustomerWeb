var express = require('express');
const db = require('../model/db');
var router = express.Router();


//แสดงรายการในตระกร้าสินค้าทั้งหมด
// router.get("/", async function (req, res, next) {
//     //ตะกร้าสินค้า
//     req.session.cart = req.session.cart || {};
//     let cart = req.session.cart; //ตะกร้าสินค้า
//     let displayCart = { items: [], total: 0 };
//     if (cart) {
//         const total = 0;
//         for (item in cartList) {
//             displayCart.items.push(cartList[item]);
//             total += (cartList[item].qty * cartList[item].price);
//         }
//         displayCart.total = total;
//     }
//     console.log(displayCart);
//     res.render('cart', { displayCart });
// });




module.exports = router;