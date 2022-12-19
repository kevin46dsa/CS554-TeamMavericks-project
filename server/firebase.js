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
//var serviceAccount = process.env.SERVICE_APP
var serviceAccount = {
	type: 'service_account',
	project_id: 'instabuzz-v2',
	private_key_id: 'f0a889d9a748332d1b97a5584d6b55ec5a98d15a',
	private_key:
		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoIQX35t7xK6J9\nrV2NCSKqBpKuNOdIP4HJDnpFjmK14hiM5RFmhQXLDS/X0eZrOWDx2O1VDANxG9Uz\ne0r8yvb1YbmFDb6LUStiTr+bfOkO9QcQ3eUikaerADluTrPfAeCmLcaHKGHyDMhF\nMLVHC6gnzWtFTtjkDSrMsp/02nTBt47iEW5YHdK8zG+CSBE8dSJzEA3gZHhEvMdl\niC4zZtgAOym8InaurTM8RrhXta44dPigGTwNerYGm84n675YswF4VK+ktZWpEozp\n/MXrs71Un/fupfk1MWsGMY0qWGhVoNyxe+Sj7KPGtota1c4kplnVSJyDXLk61jj2\nghJXdAEhAgMBAAECggEAEh2YzIjSTc8jT4JeGaO52fMiW+X0Y7sAC39lWlhIt4tY\nlNnbwZ2krafKl2kU+Emy8ewrSmYkeswCcW0f+9QMvwzcFgOQm+dPkuSkTacsX4G0\nVLNsDIkANXMtPP7675T+tTkqcoa94vxQme/xIGoXoM5H+CxSP2RRz8ORa6scOIEX\nLyrbd5wVMNapmgXgYAfv2s9MlzC/6bF62d4vZ1Cp2kRk+j47pstDyZAA/Okk9uTJ\npUe3u9aa74yl/7ps76zz6FgTBRGEFp9dwaYKNLPNLn1Rzz9wfA/zwG7M0Gqu7BsJ\nxIf/YK7khV+I9WO23V1SnIqxwbVKU/NN9FRmdgzCtwKBgQDr17dt0zr2gIB3+lx1\nwLUBK/0voeZDmbeHHDqablHehrw8MCccNZmIECSvZeJWx8xiJ2YSVYPNB1Ofz7e9\n6WI12EQ8fhctA7UzuBtwCIr00grVaVNBgg2Zv/As7JCrqR3lfWPye4/gCSv0Tvd1\nyADAqS9QeD00XThFPJrmyLj0nwKBgQC2f7gJh3VUTt0SR2QUWp9FVyDPnc7GK9S+\nPAh8yRXf79pGwqAgcv1Hjj2tC+xAePOKDWoO9kC6slUDR9HOANtjJtXMKiuXEBOm\njtu0FO8uep//+CUs7Gv8VDX7y3TsTLuY6DmE+baS5egu27NEeWzF0pjuyU3im2Vv\n7H/Ncl9yPwKBgQDjgwgKxHjfD3vfQgAsACkc5kiqyK4PjJyFlG/cRoxn9OZl0bYI\n+pQPtDMPmWPNf5TlI0jOavxor6a2RnXkmN4LP4QkLydAX5FQQU0GuNcD8hRNZ/vO\n+B0SsxyI2fV+A/k5R8tBQn27DF4AoqUKVFSVhyCDqlqwxzTfZeWwuPXj1QKBgGPF\nnWKwSKfH2bqlhwRNqudow8pdlu7mhY9fGLDH6oqcAXRP8OTsmKWnEPbrHsT8mwBt\nZv85B5hJ6Io7mGsMMuSZFadhoqUap/OWBG0GSODbL1/sVL6jnkG79CttRsXtCV6G\nDvQw5OyYfoAnonEcBSh9gxiAu3DYzfMLk69JCP9XAoGBAIK4pS88TGPOveq9Gb0l\nROH1Rg9vUrK3rNpMyxLABi4pxrg/ywDasOCFf3j6HNnICIIq9iBjDkCvjTNWOBMw\nTnSODJZp5TUJwvigreuVscqC3W2p+V2vPOwTpg/bfeJe/CmvUKEqq0X2UvvQ8+Bs\nI1SJ8m4iwaXH9mIe22sjCajP\n-----END PRIVATE KEY-----\n',
	client_email: 'firebase-adminsdk-dkfev@instabuzz-v2.iam.gserviceaccount.com',
	client_id: '105236340357865799989',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dkfev%40instabuzz-v2.iam.gserviceaccount.com',
};
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
	//credential: admin.credential.cert(JSON.parse(serviceAccount)),
	credential: admin.credential.cert(serviceAccount),
	// The database URL depends on the location of the database
	databaseURL: 'https://instabuzz-v2-default-rtdb.firebaseio.com',
	storageBucket: `instabuzz-v2.appspot.com`,
});

const firestore = getFirestore();
const storage = getStorage().bucket();
const bucket = admin.storage().bucket();

module.exports = { firestore, storage, bucket };
