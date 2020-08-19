var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//Initialize on Cloud Functions
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Add data
const docRef = db.collection('users').doc('mb0Zk08rLDvqMA46Ix3d');

await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

//Read data
const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});