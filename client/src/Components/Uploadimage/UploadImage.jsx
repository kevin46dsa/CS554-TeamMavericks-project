import React, { useState } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import { Timestamp } from '@firebase/firestore';

const App = () => {
	const [image, uploadImage] = useState('');
	const [caption, setCaption] = useState(null);
	const { userData, isUserDataLoading } = useUserData();

	const setImage = (event) => {
		const data = new FormData();

		data.append('file', event.target.files[0]);
		uploadImage(data);
	};

	const uploadHandle = async (e) => {
		e.preventDefault();
		let data = {
			uuid: userData.uid,
			name: userData.result.name,
			caption: caption,
			timestamp: Timestamp.fromDate(new Date()),
		};

		console.log(data);
		if (caption) {
			axios
				.post(' http://localhost:8000/data/upload2', data)
				.then((res) => {
					setCaption('');
					// this.fileInput.value = '';
					console.log('Executed 1st block');
					axios
						.post(' http://localhost:8000/data/upload', image)
						.then((res) => {
							console.log('done');
						});
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			alert('Enter Caption to create a post.');
		}
	};

	return (
		<>
			<h1>Upload file</h1>

			<form className="post-form" onSubmit={uploadHandle}>
				<div className="create-post">
					<input
						type="text"
						placeholder="Enter a Caption"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
					/>
					<input
						type="file"
						name="file"
						onChange={setImage}
						// ref={(ref) => (this.fileInput = ref)}
					/>
					<button className="post-button" type="submit">
						Post
					</button>
				</div>
			</form>
		</>
	);
};

export default App;
