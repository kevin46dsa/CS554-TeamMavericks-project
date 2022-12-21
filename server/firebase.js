var admin = require('firebase-admin');
const {
	getFirestore,
	Timestamp,
	FieldValue,
} = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

// Fetch the service account key JSON file contents
require('dotenv').config();

//var serviceAccount = require("./instabuzz-325f2-firebase-adminsdk-t7kea-2494f3ce27.json");
var serviceAccount = process.env.SERVICE_APP;
// var serviceAccount = {
// 	type: 'service_account',
// 	project_id: 'instabuzz-v3',
// 	private_key_id: 'c973560285f64250411b874c2b74c93c3b31affe',
// 	private_key:
// 		'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDl0YIY1Go7kv6c\nfDu4ILWdFnBnXp9Sl2Lo9QcUaRalGv3QWDErjQv7/y5AvNbGxK3iqbMpetLLaY5l\nfrM4lX39u2nAVBz8sgmvA8rDOM9mE786/4B3WanM1sSedsvPqwxkpnS031GPTUkm\ns0tYni004jNXceD+mxIcXVu7xuK0gCe+nYr3gEBAKu8W1Ja172LuOb2hbBORtfcW\nv5IphSCCKZ0G0sMeFuLarJb8Q6BkrQpdPfgwxtT76nIQ857Zo2RK3liZ4vjSF59d\nKBgTSzJEcemp+UNHrJr0Tv28lf2/Fu7qafZietjZ7A/pmu/4t3c1h9CoRZHeG9CI\nEWZo1bflAgMBAAECggEARY+C9boBh5On/jx6JPK9ldUPY7JXvft1ZDaaFHr0cDf5\nwCCZjWmNSZKE8PJXfeVVDmi4AmObPxdtktnlLEjPUEf0K9MpzPCkjrUyn6Fn4Skz\n9gsU2ssoYohVDfO+H9bRkvtxErgPazUE4bJeKW4DF+Epkhu1cssEEdLOK8l4oBIh\nKd6ybhnDEA0a0atgpvEV4sTehWCygNkSZ7CIgblg+CzubV3tFlJh1saLzVyCuI/l\nZEt4+j2ihzCNaUHA9dKPEvTdpnStRbz8ucau/7+n/RnIAJmJdLz5ZMpUGIPXv1jL\nW9qAbxdIh+MiPYmoNA+wPPwr0hMtlJNupSSOxq7ARwKBgQD/6+h22svW+U9ImRog\nN1enw4AEXgVwyIUV5h/krbE94dmGM9CrG1022SNYvQy5YEHMiW6Ci0g/qwhtEugC\nyEv3FRoMDxHcw3BuI5JZtCxti+Tj0jc8zFVyXT4k5SaTxbaDvOIOf3m1a1mXaUQ3\n8derTOE1hGzM4DjkzdCR8uVVAwKBgQDl440CcnWVy/aUUQ9U7fvFNZG7dDuGzmJq\nBgr3DFapIap9qhLluJ2m6AKwey6q6leCdNWHMFFIDzZSygi3TCA2NOIvz3nxYT0O\n0mm+x2n8L3i6Q2VPvIBRpukwnSeeBQKp+wbpXqLoRVmP730cD6Ai4hiSEHTNLVBg\nQBf1kRDm9wKBgQDzCvgu/+T72LKZ0ISGOeit8zU9cIkcLeJuBKkfRHEBwt4Q3F58\nUTV6JEa0PH28AxUaCR6BLYNEq8oJxB3AnrW+BjVBZIJjNNwuTOvs8vYKZwPN9FLv\nE2LGhJTC9zhmuCp3+8Z3XEqap0NjTt4xfySBkzaB26xz+TEu4eME6DcxPwKBgQDH\ne8avuezI+L1WhGR+eShBP7Pe6wSAfPSvNeEr8Tv99aXA9+UADExZOfijdbDQRRt8\nq69iaQ4PLowgGQqpK9jD0O35ONuDFrLp+rIiB16zo+nqD3OJVnQu5lxxf92R5J0k\nLR0ZQrKwRQVrvhBdWj3GJ1XU4YzJQin964Ae6iu1jwKBgQDrP4u/NuOLtLzvdkb+\nwetCV9WZf2f+48v1QitD0KeHyQXudV23rXyIRaZ70AipEJzDp8S4NIPyemCxVQWN\ndqW3fuUDJZZf6lcZWWiw87ccGzg5wUl8aPDk5DSrkDrTXAmB8JCvylFnGWn5Fx9f\n80xvRf+RcJT1QWHr9LL75lv9ng==\n-----END PRIVATE KEY-----\n',
// 	client_email: 'firebase-adminsdk-vgdiz@instabuzz-v3.iam.gserviceaccount.com',
// 	client_id: '103185971179330615811',
// 	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
// 	token_uri: 'https://oauth2.googleapis.com/token',
// 	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
// 	client_x509_cert_url:
// 		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vgdiz%40instabuzz-v3.iam.gserviceaccount.com',
// };

//Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(serviceAccount)),
	// credential: admin.credential.cert(serviceAccount),
	// The database URL depends on the location of the database
	databaseURL: 'https://instabuzz-v3-default-rtdb.firebaseio.com',
	storageBucket: `instabuzz-v3.appspot.com`,
});

const firestore = getFirestore();
const storage = getStorage().bucket();
const bucket = admin.storage().bucket();

module.exports = { firestore, storage, bucket };
