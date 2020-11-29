const express = require('express');
const db = require('../model/db');
const url = require('url');
const router = express.Router();


router.post("/:storeId/menuDetails", async (req, res) => {

	const path = url.parse(req.url).pathname
	console.log("This is  pathname ===> ",path);

	const splitPathname = path.split('/');
	console.log("splitPathname==>",splitPathname);

	const getShopPath = splitPathname[1];
	console.log("ShopPath------>",getShopPath)

	const storeId = req.params.storeId;
	console.log(storeId);

	

	const menuIdArr = req.body.menu;

	const restDetail = await db
		.collection("store")
		.doc(storeId)
		.get()
		.then((querySnapshot) => querySnapshot.data());
	const menuDetails = restDetail.menu.filter(menu => menuIdArr.includes(menu.menuId));
	console.log("----------------------*",menuDetails);
	res.status(200).send({ "menuDetails": menuDetails,getShopPath });




}
);

router.post("/:storeId/order", async (req, res) => {

	const path = url.parse(req.url).pathname
	console.log("This is  pathname ===> ",path);

	const splitPathname = path.split('/');
	console.log("splitPathname==>",splitPathname);

	const getShopPath = splitPathname[1];
	console.log("ShopPath------>",getShopPath)

	console.log("Callback ---------------------------- ==> ", req.user)
	req.session.profile = req.user;
	
	const storeId = req.params.storeId;
	console.log(storeId);

	const menuDetails = await db.collection("store")
	.doc(storeId)
	.get()
	.then((querySnapshot) => querySnapshot.data());

	const shopName = menuDetails.storeName;
	console.log(shopName);

	const restMenuArr = req.body.restMenu;
	console.log(restMenuArr);

	const cus_note = req.body.cus_note;
	console.log(cus_note);

	const location = req.body.locationText;
	console.log(location);

	const cus_phoneno = req.body.cus_phoneno;
	console.log(cus_phoneno);

	const total_price = req.body.carttotalprice;
	console.log(total_price);

	const d = new Date();
	const t = d.getTime();
	const docid = t-300;
	const orderRef = await db.collection("cart").doc(`${docid}`)
	orderRef.set({
		order_id: t-300,
		shopName: shopName,
		note: cus_note,
		Location: location,
		cus_phoneno: cus_phoneno,
		senderId: "Plase Wait",
		order_Date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
		order_Time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
		order_detail: restMenuArr,
		customer: req.user.displayName,
		status: "accepted",
		totalPrice:total_price
	});
	console.log('Set: ', orderRef);
	res.redirect('/')

});

module.exports = router;