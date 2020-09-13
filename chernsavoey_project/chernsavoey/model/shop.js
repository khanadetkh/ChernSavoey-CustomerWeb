const db = require('./db');

// เรียกรายชื่อร้านทั้งหมดจาDatabase
const getAllShop = async function () {
    const docRef = db.collection('store')
    const result = await docRef.get()
    return result
}

//เรียกร้านเดียวจากที่ลูกค้าเลือก
const getShop = async function () {
    const docRef = db.collection("store").where("storeName", "==", "Cafe Amazon")
    const result = await docRef.get()
    return result
}

//เรียกรายการเมนูจากแต่ละร้าน
const getAllMenu = async function () {
    const docRef = db.collection("store").doc('cafeAmazon').collection("menu")
    const result = await docRef.get()
    return result
}

const getCategory = async function () {
    const docRef = db.collection('category').doc('iSaGWOmGNrM7NttXshol');
    const result = await docRef.get()
    return result
}



module.exports = {
    getShop, getCategory, getAllShop,getAllMenu
}
