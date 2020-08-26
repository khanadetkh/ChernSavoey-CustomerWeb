const db = require('./db');
var bcrypt = require('bcryptjs');

// -- สร้างฟังก์ชั่นต่าง ๆ
// <--สร้างฟังก์ชั่น Login-->
const userLogin = async function () {
    const docRef = db.collection('users').doc('mb0Zk08rLDvqMA46Ix3d');
    const result = await docRef.get()
    return result
}
// <--สร้างฟังก์ชั่น Register-->
const userRegister = async function (name,password,email) {
  console.log(name,password,email);
    const docRef = db.collection('users');
    const result = await docRef.add({
        username: name,
        password: password,
        email: email
      });
    return result
    
}

module.exports = {
    userLogin, userRegister
}