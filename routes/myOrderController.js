const express = require('express');
const { query } = require('express-validator');
const db = require('../model/db');
const router = express.Router();


router.get('/', async function(req, res, next) {
    res.render('orderList');
});

router.get('/no-order', async function(req, res, next) {
    res.render('noOrder');
});

module.exports = router;