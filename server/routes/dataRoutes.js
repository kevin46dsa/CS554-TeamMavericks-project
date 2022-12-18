const router = require('express').Router();
const path = require('path');
const imageMagicFunction = require('../data/imagemagic');
//const data = require('../data/api')
const { firestore, storage, bucket } = require('../firebase');
const { ref, uploadBytes, listAll, deleteObject } = require('firebase/storage');
var imagefilename = undefined;
//const data = require('../data/userFunctions');
//const dataVal = require('../data/dataValidation');
//var xss = require('xss');
const { v4: uuidv4 } = require('uuid');

var createPostUserData = undefined;
const multer = require('multer');
const Mstorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		fileData = file;
		imagefilename = Date.now() + '-' + file.originalname;
		//console.log(file);
		cb(null, imagefilename);
	},
});

const upload = multer({ storage: Mstorage }).single('file');

router.post('/upload', async (req, res) => {
	upload(req, res, async (err) => {
		//image magic processing
		let user = createPostUserData;
		//userData = undefined;
		if (err) {
			res.sendStatus(500);
		}

		//logic for imagemagic

		// logic to add image to firebase storage
		let dir = __dirname;
		dir = dir.split('/');
		dir.pop();
		dir = dir.join('/');
		let imageFilepath = `${dir}/public/${imagefilename}`;
		let imageUID = uuidv4();
		//imageMagicFunction.ImageMagic(imageFilepath, imagefilename)
		console.log("Here ==>", imageFilepath , user)
		let item = await bucket.upload(imageFilepath, {
			metadata: {
			  cacheControl: "max-age=31536000",
			  // "custom" metadata:
			  metadata: {
				firebaseStorageDownloadTokens: imageUID, // Can technically be anything you want
			  },
			},
		  });
		const publicUrl = `https://firebasestorage.googleapis.com/v0/b/instabuzz-325f2.appspot.com/o/${imagefilename}?alt=media&token=${imageUID}`

		data = {
			userRef: user.uuid,
			ownerName: user.name,
			likes: [],
			imgURL: publicUrl,
			caption: user.caption,
			comment: [],
			//timestamp: user.timestamp

		};

		try {
			let createdPostID = undefined
			firestore.collection('Posts').add(data).then(function(docRef) {
				createdPostID= docRef.id
				console.log(createdPostID)
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
			
			// createdPostID gets the created post id will be used to add to user collection in the post feilds

		res.status(200).json({ data: createdPostID});
		} catch (e) {
			res.status(404).json({ Error: e });
		}
		//res.send(req.file);
	});
});

router.post('/upload2', async (req, res) => {
	console.log(req.body);
	//console.log(req)
	createPostUserData = req.body;
	res.send('Success');
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

router.get('/getSearchUser/:search', async (req, res) => {
	try {
		let search = req.params.search.toLocaleLowerCase();
		let ans = [];
		//get data from cloud fianstore
		const snapshot = await firestore.collection('users').get();

		snapshot.forEach((doc) => {
			let data = doc.data();
			if (data.name.toLowerCase().includes(search)) {
				ans.push({
					...data,
					id: doc.id,
				});
			}
		});
		res.status(200).send({ data: ans });
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
	console.log("request recieved")
	let dir = __dirname;
	dir = dir.split('/');
	dir.pop();
	dir = dir.join('/');
	let imageFilepath = `${dir}/public/1671336395686-instaBuzz(1).png`;
	let imageUID = uuidv4();
	console.log("Here=>>>",imageUID)
	let imagename = 'test1';
	let item = await bucket.upload(imageFilepath, {
		metadata: {
		  cacheControl: "max-age=31536000",
		  // "custom" metadata:
		  metadata: {
			firebaseStorageDownloadTokens: imageUID, // Can technically be anything you want
		  },
		},
	  });
	//const publicUrl = `https://firebasestorage.googleapis.com/v0/b/instabuzz-325f2.appspot.com/o/1671336395686-instaBuzz(1).png?alt=media&token=ce6dea92-ce20-4864-9d84-7438f2a8ba81`
	//https://firebasestorage.googleapis.com/v0/b/instabuzz-325f2.appspot.com/o/1671336395686-instaBuzz(1).png?alt=media&token=ce6dea92-ce20-4864-9d84-7438f2a8ba81
	//console.log(publicUrl)
});
module.exports = router;
