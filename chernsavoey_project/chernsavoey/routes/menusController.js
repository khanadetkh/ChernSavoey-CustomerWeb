var express = require('express');
const db = require('../model/db');

var router = express.Router();

router.get("/:storeId/:categoryId", async (req, res) => {
	const storeId = req.params.storeId;
	const categoryId = req.params.categoryId;

	const menuDetails = await db.collection("store")
		.doc(storeId)
		.get()
		.then((querySnapshot) => querySnapshot.data());

	const shopName = menuDetails.storeName;
	let menuList = menuDetails.menu;
	const categoriesList = menuDetails.categories;
	let categoriesFilter = [];
	if (categoryId) {
		// categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
		menuList = menuList.filter((item) => item.category == categoryId);
	}
	console.log(shopName);
	console.log(menuList);
	console.log(categoriesList);
	console.log(categoriesFilter);


	res.render("menu", { shopName, menuList, categoriesList });
}
);


module.exports = router;