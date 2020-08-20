const db = require('./db');

const userLogin = async function (){
    const docRef = db.collection('users').doc('mb0Zk08rLDvqMA46Ix3d');
    const result = await docRef.get()
    return result
}

module.exports = {
    userLogin
}