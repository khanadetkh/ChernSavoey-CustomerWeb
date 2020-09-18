var express = require('express');
const shop = require('../model/shop');
const { getAllShop } = require('../model/shop');
var router = express.Router();

/* GET shops page. */
router.get('/', async function (req, res, next) {
   try {
      const shopList = await shop.getAllShop()
      console.log(shopList);
      res.render('shop', { shopList })
   } catch (error) {
      console.error(error);
   }
});


module.exports = router;