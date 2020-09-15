var express = require('express');
const db = require('../model/db');

var router = express.Router();

// router.get('/:storeName', async function (req, res, next) {
//    let shopId = req.params.storeId;

//    const shopDetail = await db
//       .collection('store')
//       .doc(shopId).get().then((querySnapshot) => querySnapshot.data());
// });

// const menu = await db.collection('menu').where('storeName', '==', storeName)
//    .orderBy("name", "asc")
//    .get()
//    .then
//    (

//    )


module.exports = router;