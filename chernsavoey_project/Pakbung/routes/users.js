// -- Router
var express = require("express");
var router = express.Router();
const user = require('../model/user');
const { check, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/register", async function (req, res, next) {
  res.render("register");
});

router.get("/login", async function (req, res, next) {
  res.render("login");
});

router.post("/login", async function (req, res, next) {
  
});

router.post('/register', [
  check('email', 'กรุณาป้อนอีเมล').isEmail(),
  check('name', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
  check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty()
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