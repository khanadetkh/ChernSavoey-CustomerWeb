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
const userRegister = async function () {
    const docRef = db.collection('users').doc('D7giGLR2cLUXoj7aWyVA');
    // const result = await docRef.add({
    //     username: name,
    //     password: password,
    //     email: email
    //   });
    const data = {
        stringExample: name.,
        booleanExample: true,
        numberExample: 3.14159265,
        arrayExample: [5, true, 'hello'],
        nullExample: null,
        objectExample: {
          a: 5,
          b: true
        }
      };
      
      const result = await docRef.set(data);
      
    return result
}

module.exports = {
    userLogin, userRegister
}