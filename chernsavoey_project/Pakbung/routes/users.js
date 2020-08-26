// -- Router
var express = require("express");
var router = express.Router();
const User = require('../model/user');
const { check, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", async function (req, res, next) {

  const result = await user.userLogin();
  console.log(result);

  res.send("respond with a resource");
});

router.get("/register", async function (req, res, next) {
  const result = await user.userRegister();
  console.log(result);

  res.render("register");
});

router.get("/login", async function (req, res, next) {
  res.render("login");
});

// Register function
router.post('/register', [
  check('email', 'กรุณาป้อนอีเมล').isEmail(),
  check('name', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
  check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty()
], function (req, res, next) {
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
    var newUser = new User({
      name: name,
      password: password,
      email: email
    });
<<<<<<< HEAD:chernsavoey_project/Pakbung/controller/users.js
    await User.createUser(newUser, async function(err, user) {
      if (err) throw err
    });

    // const userRegis = await user.userRegister(name,password,email);
    // if (!userRegis) {
    //   res.render('register', {
    //     errors:[{msg :  "can't register"}]
    //   })
    // }
=======
    User.createUser(newUser, function (err, user) {
      if (err) throw err
    });
    res.location('/');
>>>>>>> parent of d16aa1a3... [improve] Register System:chernsavoey_project/Pakbung/routes/users.js
    res.redirect('/');
  }
});

// Login function
// router.post('/login', passport.authenticate('local', {
//   failureRedirect: '/users/login',
//   failureFlash: true
// }),
// function(req, res) {
//       req.flash("success", "ลงชื่อเข้าใช้เรียบร้อยแล้ว");
//       res.redirect('/');
// });

module.exports = router;
