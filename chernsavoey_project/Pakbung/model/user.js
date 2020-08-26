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
<<<<<<< HEAD
const userRegister = async function (name,password,email) {
  console.log(name,password,email);
  var User = module.exports = db.collection('users');
    const userSchema = await User.add({
        username: name,
        password: password,
        email: email
      });
    return userSchema
    
=======
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
>>>>>>> parent of d16aa1a3... [improve] Register System
}

module.exports.createUser = async function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserById = async function(id, callback) {
  User.findById(id, callback);
}
module.exports.getUserByName = async function(name, callback) {
  var query = {
    name: name
  };
  User.findOne(query, callback);
}

module.exports.comparePassword = async function(password, hash, callback) {
  bcrypt.compare(password, hash, async function(err, isMatch) {
        callback(null, isMatch);
  });
}

module.exports = {
    userLogin, userRegister
}