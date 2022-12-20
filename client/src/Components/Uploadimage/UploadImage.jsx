import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import { Timestamp } from '@firebase/firestore';
import useUser from '../../hooks/useUser';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { userCollection } from '../../firebase.collection';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const App = () => {
	const [image, uploadImage] = useState('');
	const [caption, setCaption] = useState('');
	const [preview, setPreview] = useState('');
	const [postId, setPostId] = useState('');
	const [snapUser, setSnapUser] = useState(undefined);
	const [postsData, setPostsData] = useState(undefined);
	const { userData, isUserDataLoading } = useUserData();
	const { user, isLoading } = useUser();
	const imageInputRef = React.useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onSnapshot(userCollection, (snapshot) => {
			setSnapUser(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (snapUser) {
			let idArray = snapUser.map((doc) => {
				return doc.id;
			});
			let userIndex = idArray.indexOf(user.uid);
			//let postArray = snapUser[userIndex].data.posts;
			let postData = snapUser[userIndex].data;
			setPostsData(postData);
		}
		//console.log(liket);
		return () => {};
	}, [snapUser]);

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
							setPostId(res.data);
						});
				})
				.catch((e) => {
					console.log(e);
				});

			if (postsData) {
				const docRef = doc(db, 'users', user.uid);
				let newUser = postsData;
				newUser.posts.push(postId);
				setPostsData(newUser);
				const data = {
					posts: newUser.posts,
				};
				updateDoc(docRef, data)
					.then((docRef) => {
						console.log('Post Uploaded to User');
						alert('Post created!');
						navigate('/profile');
					})
					.catch((error) => {
						console.log(error);
					});
			}
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
