const db = require('./db');



const displayShopName = async function(){
    const storeList = [];
       const docRef = db.collection('store');
       const result =  await docRef.get()
           return result

       return storeList
   }

const displayCategory = async function(){
    const docRef = db.collection('sategory').doc('iSaGWOmGNrM7NttXshol');
    const result =  await docRef.get()
    return result
}

const getAllShop = async function(){
    const docRef = db.collection('store')
    const result = await docRef.get()
    return result
}

module.exports = {
    displayShopName, displayCategory,getAllShop
}
