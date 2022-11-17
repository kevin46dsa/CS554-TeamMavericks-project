const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});
const { 
    getAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
   } = require("firebase/auth");

const auth = getAuth();




async function signup(username,password){
    // data validation
    

	
    // Add firebase code 
    //createUserWithEmailAndPassword(auth, email, password);

    
    //Redis Code
    //let resultString = JSON.stringify(Results[0])

    //const result = await client.lPush("recentViews", resultString)
   // console.log(result)
    
    //let acknowlwdge = await client.set(`character${ID}`, JSON.stringify(Results));

    return {result:"data"}; // this will be the array of people objects
}

async function login(username,password){
    // data validation
    

	
    // Add firebase code 
    //signInWithEmailAndPassword(auth, email, password);

    
    //Redis Code
    //let resultString = JSON.stringify(Results[0])

    //const result = await client.lPush("recentViews", resultString)
   // console.log(result)
    
    //let acknowlwdge = await client.set(`character${ID}`, JSON.stringify(Results));

    return {result:"data"}; // this will be the array of people objects
}



module.exports = {
    login,
    signup
    
}