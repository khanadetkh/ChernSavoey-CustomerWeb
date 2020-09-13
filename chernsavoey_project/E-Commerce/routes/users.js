// -- Router
var express = require("express");
var router = express.Router();
const user = require('../model/user');
const { check, validationResult } = require("express-validator");

/* GET users listing. */



// register fn
router.get("/register", async function (req, res, next) {
  res.render("register");
});


router.post('/register', [
  check('email', 'Please Input Your E-mail').isEmail(),
  check('name', 'Please Input Username').not().isEmpty(),
  check('password', 'Please Input Your Password').not().isEmpty()
], async function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  //Validation Data
  if (!result.isEmpty()) {
    //Return error to views
    res.render('register', {
      errors: errors
    })
  } else {
    //Insert  Data
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    const userRegis = await user.userRegister(name,password,email);
    if (!userRegis) {
      res.render('register', {
        errors:[{msg :  "can't register"}]
      })
    }
    res.redirect('/');
  }
});

module.exports = router;