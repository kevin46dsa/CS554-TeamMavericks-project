const express = require('express');
const app = express();
app.use(express.json());
const port = 8000;
const configRoutes = require('./routes');
//const data = require("./data/userFunctions")
const cors = require('cors');
app.use(express.static('public'));
//const dataVal = require("./data/api")  
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = ['https://betclient.herokuapp.com', 'http://localhost:3000']; //Refrence: https://www.codingdeft.com/posts/nodejs-react-cors-error/
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};

app.use(cors());
// logging middle ware
app.use(async (req, res, next) => {
	let currentTime = new Date().toUTCString();
	let method = req.method;
	let route = req.originalUrl;

	let authenticated = undefined;
	//if (req.session.user) authenticated = true;
	// else authenticated = false;

	console.log(
		`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`
	); // add the check foruser authentication
	next();
});

configRoutes(app);
app.listen(port, () => {
	console.log(`The server is running on http://localhost:${port}`);
});
