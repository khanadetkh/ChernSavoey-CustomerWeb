var express = require('express');
const db = require('../model/db');

var router = express.Router();

/* GET shops page. */
router.get("/", async (req, res) => {
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
router.get("/:storeId/cart/:menuId", async function (req, res, next) {
      const storeId = req.params.storeId;
      const menuId = req.params.menuId;
      const d = new Date();
      const t = d.getTime();
      const order = t - 300;
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

      db.collection("cart").add({
            store: shopName,
            detailOrder: cartList,
            userDate: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
            hour: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
            userYear: d.getFullYear(),

            
      })
            .then(function (db) {
                  console.log("Document written with ID: ", db.id);
            })
            .catch(function (error) {
                  console.error("Error adding document: ", error);
            });
      res.redirect("/shops/" + storeId)

});

//แสดงรายการในตระกร้าสินค้าทั้งหมด
//  router.get("/cartList", async function (req, res, next) {
//       let displayCart = { items: [], total: 0 };
//       if (req.session.cartList) {
//             const total = 0;
//             for (item in cart) {
//                   displayCart.items.push(cart[item]);
//                   total += (cart[item].qty * cart[item].price);
//             }
//             displayCart.total = total;
//       }
//       console.log(cart);
//       res.render('cart', { displayCart });
//   });

router.get("/cart", async function (req, res, next) {
      res.redirect("/cart")

});


module.exports = router;