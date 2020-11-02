var express = require('express');
const db = require('../model/db');

var router = express.Router();

router.get('/:orderId', async function(req, res, next) {
    res.render('orderSender');
});

router.get('/order/update/:orderId/:senderId/:status', async function(req, res) {
    const orderId = req.params.orderId;
    const senderId = req.params.senderId;
    const status = req.params.status;
    const orderDetails = await db.collection("cart")
        .doc(orderId)
        .update({
            senderId: senderId,
            status: status
        }).then((data) => {
            console.log("Update Complate")
            return res.status(200).send()
        }).catch(err => {
            return res.status(400).send()
        })
    return res.status(200).send()
})


module.exports = router;