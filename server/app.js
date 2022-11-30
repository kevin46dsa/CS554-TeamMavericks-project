const express = require("express");
app = express();
const cors = require("cors");
const Routes = require("./routes");
//const { initializeApp } = require("firebase/app");
const config = require("./config/config")
//initializeApp(config.firebaseConfig);
const admin = require('firebase-admin');
//const { auth } = require("firebase-admin");
require('dotenv').config({path: './'})

admin.initializeApp({
  credential: admin.credential.cert({
      projectId: 'instabuzz-325f2',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbgBjlQkasMbsQ\nrRXoRmp2d7A7KYBFtammcZd3IqM6t6Sg686D2hFNqyqezxuesk7SRF2CuMQXA0yF\n9cLnsAbRP3eEMYPp2BXokKvKSuGU/hxlzML+394c/9EK+QZjlR4dWTh2lM+wNfRR\nOAdRIZVmGndjIGxOe+ZtBrTL7c9VsUrkG7AxETSZ5/uKwbd6LYFWAshHgdp5sy4C\nBP/7BwbMqOH6bGhKaLwPE0tpfKjdtf+LQJ4I4w3FlwU15Ye8cmDl1uxKmjEcahUE\nuq+cSskr4nOvCvTjBuLsA+9yrx2jqEwRn8y48qpF1KCU0ypaA0eAvJX8Ymy3FIgz\n90YOTQChAgMBAAECggEAGZcLD/tUkvGvTefn9G71LX+Rr6wMdNQThcCbeHu0zP0o\n98vWBUAwoT3x15bssOk30ELBJiLVVZuAWePHh8xZVx7Pl71QFDypfTYUmR52wzCG\n7gVbvGwsEHRwkhdrO8PgQWqr7wM1XWVE6Q0fqUFBkihGv+tBRTsjp5VPEbFVaTdt\nZkr5igZt7FMp9a5TwWYtigDvuTsDpl+lNjaIW1JtuESOiXOU5RneR9OHmbrodimO\nCPk8XsTsl2EX/CwMOaRgC+zpEM+g6PIB2enlw/aULo+DGt2IyujN4WClKJUESH79\nfQcIyhCVwgvTdkCkCjWf+isPbOzyZvndGqZYWZs8YQKBgQD1P9eTRRgDh+PpE0CS\nF9SCPlMKlnHhSpFiywh8iT1PtBNI7JOIxFy3p1k2c48mc+xpM2xUeeYjSsd7ko+B\n02+umM/5b522X667XmmZBT3E7J4S9u0p6s//Ly8mExsx4m0KNERC935AzxW6XYLD\nySsBhm+SjO1+bNcvgkgLghfZuQKBgQDlH02VfezUb3oeqwbNX7yG72WRjyFELGzG\n0EQ/KjGMQKGQ4ODrbcNlzLPaLtqFpOhbCYAtNmwxYmD9gioRLbGbQXPPEF76iscV\ngHa50Un1YfjzdhsF+ZW8ArTWd2lF0U4WhkaNjiUgc1vbNPLPPhSPfv+t4Q/d5D1P\nbed8Fh0yKQKBgCKgSeqUFcjh1c7hlftKfAmLjSPwi9GYOqCtM9yJb+uh7Bses9Ha\nj5CqgxEKDcsLEPTlesUOlOyksTeEQNi+poULNEnudWD7b2sq8FPXhpoYIlVhIakK\nayWHXuvMRMmtQ2HucTjXQq8ZzeKLM1w7OeQ0O+qAFUQFT/h4N33Qd1eZAoGAHIKv\nqcl4ndqdTJGlkAq4r+W8MsensQ8CHh8uTtnWPoiQUjHZaxJGfTVir+SipnyluSZO\nf9HE1sRSI1l+GJMiBZq4aWy1FOIN8dwBag/j7xfY3Zq1tCGhgzqm/ATx4ZEw8VaW\nEuk8L3SLWpSVHjqwXkbEVAOscMUE6AxaALPTwDkCgYEAyGlWB7CHAjbr3DAOHuOp\nk4nGYFRjhEp0VUPmMmEZ0fJaYFUxsOlRiA7Zw0/j3kTf5L7Q0fpIB50fHFucLCcu\nnbyQjVPZ8WSA2WDkZlHQrw7/OcHoYizVcmv3bzkG+hAAYzZKbBfWnp/n0q7tgIkS\n27xidQkJgb7CadEGkUxBYNA=\n-----END PRIVATE KEY-----\n'?.replace(/\\n/g, '\n'),
      clientEmail: 'firebase-adminsdk-t7kea@instabuzz-325f2.iam.gserviceaccount.com',
  }),
  databaseURL: process.env.DATABASE_URL
});


const whitelist = ["http://localhost:3000"]; //Refrence: https://www.codingdeft.com/posts/nodejs-react-cors-error/
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample Middle ware
// should check if the user is logged in for functions like adding a post ets 
app.use("/action", async (req, res, next) => {
  const {authtoken} = req.headers;
  if (authtoken){
  try{
    req.user = await admin.auth.verifyIdToken(authtoken)
  } 
   catch(e){
    res.sendStatus(400);
   }
}
  next();
});



// logging middle ware
app.use(async (req, res, next) => {
    let currentTime = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;
    if (req.userId) authenticated = true;
    else authenticated = false;
    console.log(
      `Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth: ${authenticated}`
    );
    next();
  });

Routes(app);
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server started at port ${port}`));