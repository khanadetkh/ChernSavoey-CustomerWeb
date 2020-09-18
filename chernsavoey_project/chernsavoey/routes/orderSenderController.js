var express = require('express');
const db = require('../model/db');

var router = express.Router();

router.get('/', async function (req, res, next) {
    res.render('orderSender');
 });
 
 
 
 module.exports = router;