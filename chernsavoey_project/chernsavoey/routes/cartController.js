var express = require('express');

var router = express.Router();


router.get('/', async function (req, res, next) {
   res.render('cart');
});



module.exports = router;