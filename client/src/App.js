import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routesr from './routes/routes';
import Header from './Components/Header/Header';

// import Logo from './Components/css/logo.png'

/// temp stored this here to access fire base

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBLv75hzypiA82e6G_uk0KgVtsyl8t0eyA',
	authDomain: 'instabuzz-v3.firebaseapp.com',
	projectId: 'instabuzz-v3',
	storageBucket: 'instabuzz-v3.appspot.com',
	messagingSenderId: '382916130080',
	appId: '1:382916130080:web:56dfbce26d08da12b39345',
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

//////// end of temp code

function App() {
	return (
		<BrowserRouter>
			{/* <header className="App-header"> */}
			{/* <h1 className="App-title" src={Logo}> InstaBuzz</h1> */}
			{/* <img alt="instabuzz" src={require('./Components/css/logo4.png')} />  */}
			{/* <h1 className="App-title" img alt="instabuzz" src={require('./Components/css/logo2.png')}>  InstaBuzz </h1> */}

			{/* </header> */}
			<Header />
			<br />
			<Routesr />
		</BrowserRouter>
	);
}

export default App;
