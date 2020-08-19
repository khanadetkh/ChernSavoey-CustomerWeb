var express = require('express');
var router = express.Router();

// GET /users
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// /GET /users/register
router.get('/register', function (req, res, next) {
  res.render('register');
});

// GET /users/login
router.get('/login', function (req, res, next) {
  res.render('login');
  // res.status(200).json({
  //   message: 'login success'
  // })
});
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/users/login');
});

router.post('/register', function (req, res) {
  console.log(reg.body.name);
  console.log(reg.body.email);
  console.log(reg.body.password);
})

// //Validation
// router.post('/register', [
//   check('email', 'กรุณาป้อนอีเมล').isEmail(),
//   check('name', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
//   check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty()
// ], function (req, res, next) {
//   const result = validationResult(req);
//   var errors = result.errors;
//   //Validation Data
//   if (!result.isEmpty()) {
//     //Return error to views
//     res.render('register', {
//       errors: errors
//     })
//   })
// };


module.exports = router;