const db = require('./db');

// const displayShopName = async function(){
//     const docRef = db.collection('Store').doc('gixXindVOCKg6KqqD9MY');
//     const result =  await docRef.get()
//     return result
// }

const displayShopName = async function(){
    const storeList = [];
       const docRef = db.collection('Store').doc('gixXindVOCKg6KqqD9MY');
       const result =  await docRef.get().then(doc => {
               storeList.push(doc.data());
           });

       return storeList
   }

const displayCategory = async function(){
    const docRef = db.collection('category').doc('iSaGWOmGNrM7NttXshol');
    const result =  await docRef.get()
    return result
}

const getAllShop = async function(){
    const docRef = db.collection('Store')
    const result = await docRef.get()
    return result
}

module.exports = {
    displayShopName, displayCategory,getAllShop
}
