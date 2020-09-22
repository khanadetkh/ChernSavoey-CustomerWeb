var express = require('express');
const shop = require('../model/shop');
const { getAllShop } = require('../model/shop');
var router = express.Router();

/* GET shops page. */
router.get('/', async function (req, res) {
   try {
      const shopList = await shop.getAllShop()
      const storeId = req.params.storeId;

      console.log(storeId);
      console.log(shopList);

      res.render('shop', {storeId,shopList})
   } catch (error) {
      console.error(error);
   }
});


module.exports = router;