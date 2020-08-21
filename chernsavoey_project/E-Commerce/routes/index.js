var express = require('express');
const shop = require('../model/shop');
var router = express.Router();

/* GET home page. */
router.get('/',async function(req, res, next) {
 const result = await shop.displayShopName();
 console.log(result);

 res.render('index')
});

module.exports = router;
