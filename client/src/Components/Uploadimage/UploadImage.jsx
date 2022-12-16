import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
	const [image, uploadImage] = useState('');

	const setImage = (event) => {
		const data = new FormData();

		data.append('file', event.target.files[0]);
		uploadImage(data);
	};

	const uploadHandle = async () => {
		let data = {
			uuid: '123234',
			name: 'Deep',
		};
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
