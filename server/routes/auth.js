const router = require('express').Router();
const authFunctions = require('../data/auth');
//const dataValidation = require('../data/dataValidation');
//var xss = require('xss');

router.post('/newuser', async (req, res) => {
	//route used to create a new user from the signup page in frontend
	
	authFunctions('kevin46dsa','kevin@102')
	
	
	/*
    let data = undefined;
	


	try {
		if (req.body) data = req.body;
		else throw 'No Request Body';
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	let firstName = xss(data.firstName);
	let lastName = xss(data.lastName);
	let email = xss(data.email);
	let password = xss(data.password);

	try {
		if (!firstName) throw 'No FirstName';
		if (!lastName) throw 'No LastName';
		if (!email) throw 'No Email';
		if (!password) throw 'No Password';

		firstName = dataValidation.checkName(firstName);
		lastName = dataValidation.checkName(lastName);
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);

		console.log(`${email} is trying to create a new Account`);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		var insertedBool = await dataFunctions.createUser(
			firstName,
			lastName,
			email,
			password
		); //calls create user function
		if (insertedBool) {
			console.log(`${data.email} created new account Successfully`);
			res
				.status(201)
				.send({ data: insertedBool, message: 'User created successfully' });
		} else throw 'User Not Created';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
    */
});

router.post('/signup', async (req, res) => {
	/*
    let UserID = req.userId;

	try {
		let userInfo = await userDataFunctions.getReview(UserID); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
    */
});


module.exports = router;