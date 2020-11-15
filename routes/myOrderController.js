const express = require('express');
const { query } = require('express-validator');
const db = require('../model/db');
const router = express.Router();

/* GET shops page. */

// เก็บ UserId
router.get('/myOreder', async function(req, res, next) {

    res.render('orderList');
});


module.exports = router;