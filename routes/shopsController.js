const express = require('express');
const db = require('../model/db');
const router = express.Router();
// const passport = require("passport");

/* GET shops page. */
router.get("/",async (req, res) => {
      const profile = sessionStorage.getItem('userProfile');
      console.log("PROFILE======",profile);
      const getStore = await db
            .collection("store")
            .orderBy("storeName", "asc")
            .get().then((querySnapshot) => {
                  let storeArr = [];
                  querySnapshot.forEach((store) => storeArr.push({ storeId: store.id, ...store.data() }));
                  return storeArr;
            }
            );
      console.log(getStore);
      res.render("shop", { getStore });
}
);
// menuFucntion
//แสดงเมนูในร้าน
router.get("/:storeId", async (req, res) => {
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
            categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
            menuList = menuList.filter((item) => item.category == categoryId);
      }
      console.log(storeId);
      console.log(shopName);
      console.log(menuList);
      console.log(categoriesList);
      console.log(categoriesFilter);


      res.render("menu", { storeId, shopName, menuList, categoriesList, categoriesFilter });
}
);
//แสดงเมนูในร้าน พร้อม Category
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
            categoriesFilter = menuDetails.categories.filter((item) => item.category == categoryId)
            menuList = menuList.filter((item) => item.category == categoryId);
      }

      console.log(storeId);
      console.log(shopName);
      console.log(menuList);
      console.log(categoriesList);
      console.log(categoriesFilter);


      res.render("menu", { storeId, shopName, menuList, categoriesList, categoriesFilter, });
}
);


//add menus to cart
//add menus to cart (database)
router.post("/:storeId/cart/:menuId", async function (req, res, next) {
      const storeId = req.params.storeId;
      const menuId = req.params.menuId;

      console.log(storeId);
      console.log(menuId);
      const menuDetails = await db.collection("store")
            .doc(storeId)
            .get()
            .then((querySnapshot) => querySnapshot.data());
      const shopName = menuDetails.storeName;
      let cartList = menuDetails.menu;
      if (menuId) {
            cartList = cartList.filter((item) => item.menuId == menuId);
      }
      console.log(storeId);
      console.log(shopName);
      console.log(cartList);

      // db.collection("cart").add({
      //       store: shopName,
      //       detailOrder: cartList,
      //       userDate: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
      //       hour: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      //       userYear: d.getFullYear(),

            
      // })
      //       .then(function (db) {
      //             console.log("Document written with ID: ", db.id);
      //       })
      //       .catch(function (error) {
      //             console.error("Error adding document: ", error);
      //       });
      res.redirect("/shops/" + storeId)

});



router.get("/cart", async function (req, res, next) {
      res.redirect("/cart")

});

router.post
(	
	"/cart",
	async (req, res) =>
	{
            /*
            dishArr
            
            */ 
            
            
            const dishArr = req.body.dishes;

		const details = [];
		for(let i = 0; i < dishArr.length; i++)
		{
			const dishId = dishArr[i];
			
			let dishDetails = await firestore
				.collection("dishes")
				.doc(dishId)
				.get()
				.then((querySnapshot) => querySnapshot.data());

			const rest_id = dishDetails.rest_id;

			dishDetails = {
				id: dishId,
				name: dishDetails.name,
				price: dishDetails.price
			};
			
			let restDetails = await firestore
				.collection("restaurants")
				.doc(rest_id)
				.get()
				.then((querySnapshot) => querySnapshot.data());

			restDetails = { name: restDetails.name };

			details.push({ dishDetails, restDetails });
		}

		res.status(200).send({ "cart": details });
	}
);




module.exports = router;


//add menus to cart (database)
// router.post("/:storeId/cart/:menuId", async function (req, res, next) {
// const storeId = req.params.storeId;
// const menuId = req.params.menuId;
// const d = new Date();
// const t = d.getTime();

// req.session.cart = req.session.cart || {};
// const cart = req.session.cart; //ตะกร้าสินค้า

// console.log(storeId);
// console.log(menuId);
// const menuDetails = await db.collection("store")
//       .doc(storeId)
//       .get()
//       .then((querySnapshot) => querySnapshot.data());
// const shopName = menuDetails.storeName;
// let cartList = menuDetails.menu;
// if (cart) {
//       cartList = cartList.filter((item) => item.menuId == menuId);
// }
// console.log(storeId);
// console.log(shopName);
// console.log(cartList);

// db.collection("cart").add({
//       store: shopName,
//       detailOrder: cartList,
//       userDate: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
//       hour: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
//       userYear: d.getFullYear(),


// })
//       .then(function (db) {
//             console.log("Document written with ID: ", db.id);
//       })
//       .catch(function (error) {
//             console.error("Error adding document: ", error);
//       });
//       res.redirect("/shops/" + storeId)

// });




module.exports = router;

