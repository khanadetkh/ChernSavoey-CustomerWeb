var express = require('express');
const shop = require('../model/shop');
const { getAllShop } = require('../model/shop');
var router = express.Router();

/* GET shops page. */
router.get('/shops', async function (req, res, next) {
   try {
      const shopList = await shop.getAllShop()
      console.log(shopList);
      res.render('shop', { shopList })
   } catch (error) {
      console.error(error);
   }
});

router.get('/cart', async function (req, res, next) {
   res.render('cart');
});

//รอแยกแต่ละ controller
router.get('/orderList', async function (req, res, next) {
   res.render('orderList');
});

router.get('/inbox', async function (req, res, next) {
   res.render('inbox');
});

router.get('/chat', async function (req, res, next) {
   res.render('chat');
});

router.get('/profile', async function (req, res, next) {
   res.render('profile');
});


module.exports = router;