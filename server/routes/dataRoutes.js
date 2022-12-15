const router = require('express').Router();
//const data = require('../data/api')
const { firestore, storage } = require('../firebase');
const { ref, uploadBytes, listAll, deleteObject } = require('firebase/storage');

//const data = require('../data/userFunctions');
//const dataVal = require('../data/dataValidation');
//var xss = require('xss');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');

const Mstorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: Mstorage }).single('file');

router.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		//image magic processing and upload to fire base logic
		if (err) {
			res.sendStatus(500);
		}
		res.send(req.file);
	});
});

router.get('/getAllUsers', async (req, res) => {
	try {
		let allUsers = {};
		//get data from cloud firestore
		const snapshot = await firestore.collection('users').get();

		snapshot.forEach((doc) => {
			allUsers[`${doc.id}`] = doc.data();
		});
		res.status(200).send({ data: allUsers });
	} catch (e) {
		res.status(404).json({ Error: e });
	}
});

// *************************************************

data = {
	userRef: 'testuser3',
	likes: 15,
	comment: 'Testpost3',
};

router.get('/createpost', async (req, res) => {
	try {
		let newUID = uuidv4();
		const res = await firestore.collection('Posts').add(data);
		if (!res.id) throw 'error while creating post';

		res.status(200).send({ data: res.id });
	} catch (e) {
		res.status(404).json({ Error: e });
	}
});

// *************************************************

router.get('/uploadImage', async (req, res) => {
	//let imageFileNames={};
	let imageFilepath =
		'/Users/kevindsa/Documents/Course work Stevens/WP2Project/CS554/CS554-TeamMavericks-project/server/assets/937ea8284ca0fed7ddcb933dde4c56b3-uncropped_scaled_within_1536_1152.webp';
	let imageUID = uuidv4();
	let imagename = 'test1';
	await storage.upload(imageFilepath);
});

module.exports = router;
