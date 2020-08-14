var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
<<<<<<< HEAD
router.get('/register', function (req, res, next) {
  res.send('register');
});
router.get('/login', function (req, res, next) {
  res.send('login ');
});
module.exports = router;
=======
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
module.exports = router;
>>>>>>> cbb49f04d4d2a87fca1b375df31e6cde7c42d483
