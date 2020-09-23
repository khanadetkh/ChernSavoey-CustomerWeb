var express = require('express');

var router = express.Router();

/* GET shops page. */
router.get('/', async function (req, res, next) {
    res.render('editProfile');
});


module.exports = router;