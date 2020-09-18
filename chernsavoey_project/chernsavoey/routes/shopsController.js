var express = require('express');
const shop = require('../model/shop');
const { getAllShop } = require('../model/shop');
var router = express.Router();

/* GET shops page. */
router.get('/', async function (req, res, next) {
   try {
      const shopList = await shop.getAllShop()
      let storeId = req.params.storeId;
      console.log(storeId);
      console.log(shopList);
      res.render('shop', { shopList,storeId })
   } catch (error) {
      console.error(error);
   }
});


module.exports = router;