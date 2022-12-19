// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB_s7JDsdkw8FSFt-NwadQAFZHsDx2BNvw',
	authDomain: 'instabuzz-v2.firebaseapp.com',
	projectId: 'instabuzz-v2',
	storageBucket: 'instabuzz-v2.appspot.com',
	messagingSenderId: '309544446406',
	appId: '1:309544446406:web:c383a2fe62de8cbe89aac7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);
