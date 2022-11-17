const express = require("express");
app = express();
const cors = require("cors");
const Routes = require("./routes");
const { initializeApp } = require("firebase/app");
const config = require("./config/config")
initializeApp(config.firebaseConfig);


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
/*
app.use("/users", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
*/


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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started at port ${port}`));