var express = require('express');
const db = require('../model/db');
// const { getAllShop } = require('../model/shop');

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


module.exports = router;