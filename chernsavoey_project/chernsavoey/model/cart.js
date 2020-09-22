const db = require('./db');

// เรียกรายชื่อร้านทั้งหมดจากDatabase
const getMenuItems = async function () {
    const docRef = db.collection("store")
    const result = await docRef.get();
    return result
}

module.exports = {
     getMenuItems
}
