const express = require('express');
const { query } = require('express-validator');
const db = require('../model/db');
const router = express.Router();

/* GET shops page. */

// เก็บ UserId
router.get('/myOreder', async function(req, res, next) {
    res.render('orderList');
});


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
    console.log("Callback ---------------------------- ==> ", req.user)
    req.session.profile = req.user;
    const orderId = req.params.orderId;
    res.render('chat', {orderId, user:req.user});
});



router.get("/:orderId", async(req, res) => {
    const orderId = req.params.orderId;

    const orderDetail = await db.collection("cart")
        .doc(orderId)
        .get()
        .then((querySnapshot) => querySnapshot.data());
    const orderList = orderDetail.order_detail;
    const location = orderDetail.Location;
    const phoneno = orderDetail.cus_phoneno;
    const senderName = orderDetail.senderId.user;
    const shopName = orderDetail.shopName;
    const totalprice = orderDetail.totalPrice; 
    const notetosender = orderDetail.note; 
    const orderStatus = orderDetail.status
    console.log(orderId);
    console.log(orderList);
    res.render("orderList", {orderList,location,phoneno,senderName,shopName,totalprice,notetosender,orderStatus });
});



module.exports = router;