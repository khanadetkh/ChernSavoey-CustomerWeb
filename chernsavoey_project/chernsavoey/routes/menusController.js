var express = require('express');
const db = require('../model/db');

var router = express.Router();

router.get ("/:storeId", async (req, res) => {
			let storeId = req.params.storeId;
			
			const menuDetails = await db.collection("store").doc(storeId).get().then((querySnapshot) => querySnapshot.data());

			const menuList = menuDetails['menu']
		
			console.log(menuList);

			res.render("menu", { menuList });
		}
	);


module.exports = router;