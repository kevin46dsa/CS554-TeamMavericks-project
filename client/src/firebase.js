// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBLv75hzypiA82e6G_uk0KgVtsyl8t0eyA',
	authDomain: 'instabuzz-v3.firebaseapp.com',
	projectId: 'instabuzz-v3',
	storageBucket: 'instabuzz-v3.appspot.com',
	messagingSenderId: '382916130080',
	appId: '1:382916130080:web:56dfbce26d08da12b39345',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);
