import React, { useState } from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
//import { db } from '../../App';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
// import Like from '../Like/Like';
import useUser from '../../hooks/useUser';
var moment = require('moment');

const Post = ({ allData }) => {
	//const [comments, setComments] = useState([]);
	const { user, isLoading } = useUser();
	const [comment, setComment] = useState('');
	let username = allData.data.ownerName;
	let caption = allData.data.caption;
	let imageUrl = allData.data.imgURL;
	let postId = allData.id;
	let posterId = allData.data.userRef;
	let comments = allData.data.comments;
	// console.log('All Data');
	console.log(allData);
	console.log('id');
	console.log(user);
	// console.log('displayName');
	// console.log(user.displayName);
	const postComment = (e) => {
		e.preventDefault();

		const docRef = doc(db, 'Posts', postId);

		let currentComment = {
			comments: comment,
			timeStamp: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a'),
			userId: user.uid,
			username: user.displayName,
		};
		comments.push(currentComment);
		const data = {
			comments: comments,
		};
		updateDoc(docRef, data)
			.then((docRef) => {
				console.log('Value of an Existing Document Field has been updated');
			})
			.catch((error) => {
				console.log(error);
			});

		setComment('');
		// logic to come
	};

	//alldata.data.comments --> array of objects {userid:{}}

	// const postComment = (e) => {
	// 	e.preventDefault();
	// 	db.collection('Posts').doc(postId).collection('comments').add({
	// 		text: comment,
	// 		username: user.displayName,
	// timestamp: fb.firestore.FieldValue.serverTimestamp(),
	// 	});
	// 	setComment('');
	// };

	return (
		<>
			<div className="post" key={allData.id}>
				<div className="post__header">
					{/* Header: avatar with username */}
					<Avatar alt={username} src="/static/images/avatar/1.jpg" />

					<h3>{username}</h3>
				</div>
				{/* Image */}
				<img className="post__image" src={imageUrl} alt="" />
				{/* Username + caption */}
				<h4 className="post__text">
					<strong>{username}</strong> {caption}
				</h4>
				{/* <Like></Like> */}
				{/* <Like id={allData.id} /> */}

				{/* Start of comments */}

				<form className="comment__form">
					<div className="comment__wrapper">
						<input
							className="comment__Input"
							type="text"
							placeholder="Add a comment..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							className="comment__button text__button"
							disabled={!comment}
							onClick={postComment}
							type="submit"
						>
							Post
						</button>
					</div>
				</form>

				{/* End of comments */}
			</div>
		</>
	);
};

export default Post;
