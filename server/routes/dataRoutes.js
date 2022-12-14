const router = require('express').Router();
//const data = require('../data/api')
require("../firebase")
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const firestoredb = getFirestore();
//const data = require('../data/userFunctions');
//const dataVal = require('../data/dataValidation');
//var xss = require('xss');



router.get('/getAllUsers', async (req, res) => {
    try{
let allUsers = {}
//get data from cloud firestore
  const snapshot = await firestoredb.collection('users').get();

  snapshot.forEach((doc) => { 
    allUsers[`${doc.id}`] = doc.data()
})
        res.status(200).send({ data: allUsers });
        }
        catch(e){
            res.status(404).json({"Error": e});
       }
});



module.exports = router;