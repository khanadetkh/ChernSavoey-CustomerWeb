const db = require('./db');

// เรียกรายชื่อร้านทั้งหมดจากDatabase
const getAllShop = async function () {
    const docRef = db.collection("store").orderBy("storeName", "asc");
    const result = await docRef.get();
    return result
}

module.exports = {
     getAllShop
}
