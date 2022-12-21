import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUserData from '../../hooks/useUserData';
import { Timestamp } from '@firebase/firestore';
import useUser from '../../hooks/useUser';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { userCollection } from '../../firebase.collection';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';

const Edit = () => {
	const [image, uploadImage] = useState(undefined);
	const [bio, setBio] = useState('');
	const [preview, setPreview] = useState('');
	const [postId, setPostId] = useState('');
	const [snapUser, setSnapUser] = useState(undefined);
	const [snapUserData, setSnapUserData] = useState(undefined);
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
			let userData = snapUser[userIndex].data;
			setSnapUserData(userData);
		}
		//console.log(liket);
		return () => {};
	}, [snapUser]);

	const setImage = (event) => {
		setPreview(event.target.files[0]);
		uploadImage(event.target.files[0]);
	};

	const uploadHandle = async (e) => {
		e.preventDefault();
		let imgUrls = undefined;
		async function storeImage(image) {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const filename = `${image.name}`;
				const storageRef = ref(storage, filename);
				const uploadTask = uploadBytesResumable(storageRef, image);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						// Observe state change events such as progress, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
						}
					},
					(error) => {
						// Handle unsuccessful uploads
						reject(error);
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		}


		if (image) {
			imgUrls = await storeImage(image).catch((error) => {
				alert('Images not uploaded');
				return;
			});
		}
		console.log(imgUrls);
		const docRef = doc(db, 'users', user.uid);
		let data = undefined;
		if (imgUrls && bio) {
			data = {
				displayPicture: imgUrls,
				bio: bio,
			};
		} else if (imgUrls) {
			data = {
				displayPicture: imgUrls,
			};
		} else if (bio) {
			data = {
				bio: bio,
			};
		} else {
			data = null;
		}
		if(data.bio && data.bio.trim().length === 0){
			alert("Bio cannot contain just spaces")
		}
		else if (data) {
			updateDoc(docRef, data)
				.then((docRef) => {
					console.log('Display picture updated');
					alert('Profile updated');
					navigate('/profile');
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			alert('Enter either bio or Display Pic to Update');
		}
		//displayPicture
		// update the users data
		// const docRef = await addDoc(collection(db, "users"), formDataCopy);
		// alert("Listing created");
		// navigate(`/profile`);
	};

	return (
		<>
			<h1>Edit Profile</h1>

			<form className="post-form" onSubmit={uploadHandle}>
				<div className="create-post">
					<input
						type="text"
						placeholder="Enter a Bio"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>

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

export default Edit;