var express = require('express');
const shop = require('../model/shop');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
   const result = await shop.displayShopName();
   console.log(result);

   const result2 = await shop.displayCategory();
   console.log(result2);

   res.render('index')
});

router.get('/cart', async function (req, res, next) {
   res.render('cart');
});

router.get('/menu', async function (req, res, next) {
   res.render('menu');
});

router.get('/', async function (req, res, next) {
   res.render('index');
});


module.exports = router;
