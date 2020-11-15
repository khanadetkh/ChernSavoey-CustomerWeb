const express = require('express');
const { query } = require('express-validator');
const db = require('../model/db');
const router = express.Router();

/* GET shops page. */

router.post('/:orderId/chat', async function(req, res, next) {
    const orderId = req.params.orderId;
    const receiveId = req.body.receiveId; //ผู้รับข้อความ
    const senderId = req.body.senderId; //ผู้ส่งข้อความ
    const message = req.body.message;
    const d = new Date();

    const ref = db.collection('chat').doc(orderId)
    console.log(req.body);

    const chatRef = await ref.get().then((snapshot) => snapshot.data())

    if (!chatRef.messages) {
        await ref.set({
            messages: []
        })
    }
    let newChat = []
    newChat = [...chatRef.messages, {
        receiveId,
        senderId,
        message,
        day: d,
    }]

    console.log("New Chat ", newChat)

    await ref.update({
        messages: newChat
    })

    return res.status(200);
});

router.get('/:orderId/chat', async function(req, res, next) {
    const orderId = req.params.orderId;
    res.render('chat', { orderId });
});

router.get("/:orderId", async(req, res) => {
    const getOrder = await db
        .collection("cart")
        .orderBy("hour", "desc")
        .get().then((querySnapshot) => {
            let orderArr = [];
            querySnapshot.forEach((cart) => orderArr.push({ orderId: cart.id, ...cart.data() }));
            return orderArr;
        });
    const orderId = req.params.orderId;
    const orderDetails = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());
    const orderList = orderDetails.detailOrder;
    console.log(orderId);
    console.log(orderList);
    console.log(getOrder);
    res.render("orderList", { getOrder, orderList, orderId });
});

module.exports = router;