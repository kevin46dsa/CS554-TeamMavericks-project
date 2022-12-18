import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import { db } from '../../App';
import {
	getDocs,
	doc,
	onSnapshot,
	updateDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../firebase';
// import Like from '../Like/Like';
import useUser from '../../hooks/useUser';
var moment = require('moment');

const Post = ({ allData }) => {
	const { user, isLoading } = useUser();
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState(allData.data.comments);
	const [testData, setTestData] = useState([]);

	//const [commentPull, setCommentPull] = useState([]);

	let username = allData.data.ownerName;
	let caption = allData.data.caption;
	let imageUrl = allData.data.imgURL;
	let postId = allData.id;
	let posterId = allData.data.userRef;

	let docRef;
	useEffect(() => {
		setComments(allData.data.comments);
		const getComments = async () => {
			docRef = onSnapshot(doc(db, 'Posts', postId));
			const docSnap = await getDocs(docRef);
			let CommentPull = docSnap.data();

			setComments(CommentPull.comments);
			console.log(docSnap.data());
		};
		getComments();
	}, [docRef]);

	////	console.log(allData);

	console.log(testData);
	const postComment = (e) => {
		e.preventDefault();

		const docRef = doc(db, 'Posts', postId);

		let currentComment = {
			comment: comment,
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
				//console.log(commentPull.comments);
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
				{/* Like Shit Here*/}
				<h3 class="text-success">Likes:</h3> <br></br>
				<FavoriteIcon
					//   onClick={() => handleLikeClick()}
					color="secondary"
					style={{ marginRight: 8, width: 20, cursor: 'pointer' }}
				/>
				<FavoriteBorder
					//   onClick={() => handleLikeClick()}

					style={{ marginRight: 8, width: 20, cursor: 'pointer' }}
				/>
				<br></br>
				{/* Start of comments */}
				<h3 class="text-success">Comments:</h3> <br></br>
				{
					<div className={comments.length > 0 ? 'post__comments' : ''}>
						{comments.map((comment) => (
							<p class="meta">
								<strong>{comment.username}</strong> {comment.comment} <br></br>
								<p class="meta-2">{comment.timeStamp} </p>
							</p>
						))}
					</div>
				}
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
