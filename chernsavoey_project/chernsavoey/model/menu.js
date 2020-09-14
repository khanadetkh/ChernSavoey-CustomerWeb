const db = require('./db');

//เรียกร้านเดียวจากที่ลูกค้าเลือก
const getShop = async function () {
    const docRef = db.collection('store')
    const result = await docRef.get()
    return result
}

//เรียกรายการเมนูจากแต่ละร้าน
// const getAllMenu = async function () {
//     const docRef = db.collection('store')
//     const result = await docRef.get()
//     return result
// }

// const getCategory = async function () {
//     const docRef = db.collection('category').doc('iSaGWOmGNrM7NttXshol');
//     const result = await docRef.get()
//     return result
// }

module.exports = {
     getAllShop
}