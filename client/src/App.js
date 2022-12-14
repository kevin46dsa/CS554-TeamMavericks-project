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
	apiKey: 'AIzaSyCxLJ5qKhyBropVgqkFeqHmQXaqP8pb63w',
	authDomain: 'instabuzz-325f2.firebaseapp.com',
	projectId: 'instabuzz-325f2',
	storageBucket: 'instabuzz-325f2.appspot.com',
	messagingSenderId: '618820226728',
	appId: '1:618820226728:web:c7af05e3aaa448aef03c9d',
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
