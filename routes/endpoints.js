const express = require('express');
const db = require('../model/db');
const router = express.Router();


router.post("/:storeId/menuDetails", async (req, res) => {


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
	res.status(200).send({ "menuDetails": menuDetails });


}
);

router.post("/:storeId/order", async (req, res) => {
	const storeId = req.params.storeId;
	console.log(storeId);

	const restMenuArr = req.body.restMenu;
	console.log(restMenuArr);

	const cus_note = req.body.cus_note;
	console.log(cus_note);

	const location = req.body.locationText;
	console.log(location);

	const cus_phoneno = req.body.cus_phoneno;
	console.log(cus_phoneno);

	const d = new Date();
	const t = d.getTime();
	const id = t - 300;
	const data = {
		order_id: id, 
		note: cus_note,
		Location: location,
		cus_phoneno: cus_phoneno,
		order_Date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
		order_Time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
		order_detail: restMenuArr,
		userId: "mockup_ID",
		status: "accepted"
		// totalPrice: totalPrice
	};
	console.log(data);
	const orderRef = await db.collection("cart").add(data);
	console.log('Set: ', orderRef);
	res.redirect('/')

});

module.exports = router;