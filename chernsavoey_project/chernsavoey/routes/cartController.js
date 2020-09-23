var express = require('express');
// const db = require('../model/db');
var router = express.Router();


/* GET shops page. */
router.get('/', async function (req, res, next) {
  res.render('cart');
});





module.exports = router;