const router = require('express').Router();
//const data = require('../data/api')

//const data = require('../data/userFunctions');
//const dataVal = require('../data/dataValidation');
//var xss = require('xss');


router.get('/', async (req, res) => {
    //try{
    
        //data validation  for id 
        //data.checkNumber(req.params.searchterm)
    
        //let characterDataBySearch = await data.getCharactersBySearch(req.params.searchterm);
        res.sendStatus(200)
        //}
        //catch(e){
        //    res.status(404).json({"Error": e});
        //}
});



module.exports = router;