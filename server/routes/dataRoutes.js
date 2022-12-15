const router = require('express').Router();
const path = require("path");
const imageMagicFunction = require('../data/imagemagic')
//const data = require('../data/api')
const { firestore, storage } = require('../firebase');
const { ref, uploadBytes, listAll, deleteObject } = require('firebase/storage');
var imagefilename = undefined
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
		imagefilename =  Date.now() + '-' + file.originalname
		cb(null, imagefilename);
	},
});

const upload = multer({ storage: Mstorage }).single('file');

router.post('/upload',async (req, res) => {
	
	upload(req, res, async (err) => {
		//image magic processing 
		if (err) {
			res.sendStatus(500);
		}
		
		//logic for imagemagic
		
		
		
		
		// logic to add image to firebase storage
		let dir = __dirname
		dir = dir.split("/")
		dir.pop();
		dir = dir.join("/")
		let imageFilepath = `${dir}/public/${imagefilename}`
		//imageMagicFunction.ImageMagic(imageFilepath, imagefilename)
		
		let item = await storage.upload(imageFilepath);
		//const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item._location.bucket}/o/${item._location.path_}?alt=media`
		//console.log(publicUrl)
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
	let dir = __dirname
	dir = dir.split("/")
	dir.pop();
	dir = dir.join("/")
	let imageFilepath = `${dir}/public/1671080350803-937ea8284ca0fed7ddcb933dde4c56b3-uncropped_scaled_within_1536_1152.webp`
		let imageUID = uuidv4();
	let imagename = 'test1';
	let item = await storage.upload(imageFilepath);
	//const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${item[0].bucket.id}/o/${item[0].id}?alt=media`
		//console.log(publicUrl)
	
});
module.exports = router;

