const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../project-f9b96-firebase-adminsdk-ybyij-e2736f502a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-f9b96.firebaseio.com"
});

const fireData = admin.database();

function renderList(doc) {
  let str = '';

};

router.get('/', function(req, res, next) {
  fireData.ref('products').once('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data[0].chTitle)
    res.render('menu', { 'products': data });
  })
});



module.exports = router;
