var express = require('express');
const db = require('../model/db');
var router = express.Router();

/* GET shops page. */
router.get('/', async function (req, res, next) {
    res.render('cart');
});

// router.post('/', async function (req, res, next) {
//     const res = await db.collection('cart').add({
//         locationName:hid-location,
//         noteToSender:hid-noteToSender
//     });

//     console.log('Added document with ID: ', res.id);
// });





// router.post('/orderDetails', async (req, res) => {
//     const menuArr = req.body.menus;

//     const details = [];
//     for (let i = 0; i < menuArr.length; i++) {
//         const menuId = menuArr[i];

//         //  let menuDetails = await db.collection("menu").add(menuDetails);
//         let menuDetails = await db
//             .collection("menu")
//             .doc(menuId)
//             .get()
//             .then((querySnapshot) => querySnapshot.data());


//         const storeId = menuDetails.store.id;

//         menuDetails = {
//             id: menuId,
//             name: menuDetails.menuName,
//             price: menuDetails.price
//         };

//         let storeDetails = await db
//             .collection("store")
//             .doc(storeId)
//             .get()
//             .then((querySnapshot) => querySnapshot.data());

//         storeDetails = { name: storeDetails.storeName };

//         details.push({ menuDetails, storeDetails });
//     }

//     res.status(200).send({ "menuStoreDetails": details });
// }
// );



module.exports = router;