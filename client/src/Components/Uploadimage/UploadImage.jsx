import React, { useState } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import { Timestamp } from '@firebase/firestore';
const App = () => {
	const [image, uploadImage] = useState('');
	const [caption, setCaption] = useState('');
	const [preview, setPreview] = useState('');
	const { userData, isUserDataLoading } = useUserData();

	const imageInputRef = React.useRef();

	const setImage = (event) => {
		setPreview(event.target.files[0]);
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
		if (image) {
			axios
				.post(' http://localhost:8000/data/upload2', data)
				.then((res) => {
					setCaption('');
					imageInputRef.current.value = '';

					uploadImage(null);
					console.log('Executed 1st block');
					axios
						.post(' http://localhost:8000/data/upload', image)
						.then((res) => {
							console.log(res);
						});
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			alert('Upload an Image to create new post');
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
					{/* <input
						type="file"
						name="file"
						accept="image/*"
						onChange={setImage}
						ref={imageInputRef}
					/> */}
					<input
						type="file"
						accept=".jpg,.png,.jpeg,.webp"
						onChange={setImage}
						ref={imageInputRef}
						multiple
					/>
					<button className="post-button" type="submit">
						Post
					</button>
					{image && (
						<>
							<h2>Preview</h2>
							<img
								src={image ? URL.createObjectURL(preview) : null}
								className="post-image"
							/>
						</>
					)}
				</div>
			</form>
		</>
	);
};

export default App;
