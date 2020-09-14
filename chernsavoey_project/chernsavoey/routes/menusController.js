var express = require('express');
const menu = require('../model/menu');
const { getAllShop } = require('../model/menu');
var router = express.Router();

router.get('/:storeName', async function (req, res, next) {
    try {
        const shopList = await menu.getShop()
        console.log(shopList);
        res.render('menu', { shopList })
     } catch (error) {
        console.error(error);
     }
  });
 
 
 module.exports = router;