var express = require('express');
const db = require('../model/db');
var router = express.Router();

/* GET shops page. */

router.get("/", async (req, res) => {
   const getOrder = await db
      .collection("cart")
      .get().then((querySnapshot) => {
         let orderArr = [];
         querySnapshot.forEach((cart) => orderArr.push({ orderId: cart.id, ...cart.data() }));
         return orderArr;
      });
   console.log(getOrder);
   res.render("homeSender", { getOrder });
});



module.exports = router;