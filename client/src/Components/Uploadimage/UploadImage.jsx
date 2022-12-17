import React, { useState } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import {  serverTimestamp  } from "firebase/firestore";

const App = () => {
	const [image, uploadImage] = useState('');
	const {userData,isUserDataLoading} = useUserData()

	const setImage = (event) => {
		const data = new FormData();

		data.append('file', event.target.files[0]);
		uploadImage(data);
	};
	let currenttimestamp= serverTimestamp()
	const uploadHandle = async (e) => {
		e.preventDefault();
		let data = {
			uuid: userData.uid,
			name: userData.result.name,
			//timestamp: currenttimestamp
		};
		console.log(data)

		axios
			.post(' http://localhost:8000/data/upload2', data)
			.then((res) => {
				console.log('Executed 1st block');
				axios.post(' http://localhost:8000/data/upload', image).then((res) => {
					console.log('done');
					
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<>
			<h1>Upload file</h1>

			<form className="post-form" onSubmit={uploadHandle}>
				<div className="create-post">
					<input type="file" name="file" onChange={setImage} />
					<button className="post-button" type="submit">
						Post
					</button>
				</div>
			</form>
		</>
	);
};

export default App;
