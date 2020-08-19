var express = require('express');
var router = express.Router();

// GET /users
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// /GET /users/register
router.get('/register', function (req, res, next) {
  res.send('register');
});

// GET /users/login
router.get('/login', function (req, res, next) {

  res.status(200).json({
    message: 'login success'
  })
});
module.exports = router;