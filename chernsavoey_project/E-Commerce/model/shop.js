const db = require('./db');

const displayShopName = async function(){
    const docRef = db.collection('Store').doc('gixXindVOCKg6KqqD9MY');
    const result =  await docRef.get()
    return result
}

module.exports = {
    displayShopName
}