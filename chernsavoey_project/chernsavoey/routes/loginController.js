var express = require('express');
var router = express.Router();

/* GET home page. */
// login fn
router.get("/", async function (req, res, next) {
  res.render("login");
});

router.post("/", async function (req, res, next) {
  res.redirect('/shops');
});

module.exports = router;
