const db = require('./db');
// var bcrypt = require('bcryptjs');

// -- สร้างฟังก์ชั่นต่าง ๆ

// <--สร้างฟังก์ชั่น Login-->
const userLogin = async function () {
    const docRef = db.collection('users').doc('mb0Zk08rLDvqMA46Ix3d');
    const result = await docRef.get()
    return result
}

module.exports = {
    userLogin
}