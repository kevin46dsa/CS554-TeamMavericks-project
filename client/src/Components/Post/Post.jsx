import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar } from '@mui/material';
import { postCollection } from '../../firebase.collection';
import { Timestamp } from '@firebase/firestore';
import timeAgo from 'epoch-timeago';
import Like from '../Like/Like';
import ClearIcon from '@mui/icons-material/Clear';

//import { db } from '../../App';
import {
	getDocs,
	doc,
	onSnapshot,
	updateDoc,
	collection,
} from 'firebase/firestore';
import { db } from '../../firebase';
import useUser from '../../hooks/useUser';

const Post = ({ allData }) => {
	const { user, isLoading } = useUser();
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState(allData.data.comments);
	const [likeArray, setLikeArray] = useState(undefined);
	const [dataForComment, setdataForComment] = useState(undefined);
	const [uid, setUid] = useState(undefined);
	//const [commentPull, setCommentPull] = useState([]);

	let username = allData.data.ownerName;
	let caption = allData.data.caption;
	let imageUrl = allData.data.imgURL;
	let postId = allData.id;
	let posterId = allData.data.userRef;

	let docRef;

	useEffect(() => {
		const unsubscribe = onSnapshot(postCollection, (snapshot) => {
			setdataForComment(
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
		//setComments(allData.data.comments);
		if (dataForComment) {
			let idArray = dataForComment.map((doc) => {
				return doc.id;
			});

			let userIndex = idArray.indexOf(postId);
			// console.log(dataForComment);
			// console.log(user.uid);
			// console.log(userIndex);
			let comments = dataForComment[userIndex].data.comments;
			let likeArray = dataForComment[userIndex].data.likes;
			// console.log(comments);
			setUid(user.uid);
			setComments(comments);
			setLikeArray(likeArray);
		}
		//console.log(liket);
		return () => {};
	}, [dataForComment]);

	const deleteComment = (comment) => {
		const docRef = doc(db, 'Posts', postId);
		const index = comments.indexOf(comment);
		let newComments = comments;
		console.log(newComments);
		console.log(comment);
		console.log(index);
		let newComments2 = newComments.splice(index, 1);
		console.log('newComments2');
		console.log(newComments);
		const data = {
			comments: newComments,
		};
		updateDoc(docRef, data)
			.then((docRef) => {
				console.log('Comment Deleted Successfully');
				//console.log(commentPull.comments);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const postComment = (e) => {
		e.preventDefault();

		const docRef = doc(db, 'Posts', postId);
		let currentComment = {
			comment: comment,
			timeStamp: Timestamp.fromDate(new Date()),
			userId: user.uid,
			username: user.displayName,
		};
		// console.log('$$$$$');
		// console.log(currentComment);
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
				<h3 class="text-success">Likes:{likeArray && likeArray.length}</h3>{' '}
				<br></br>
				<Like id={postId} className="post-iconItem" />
				<br></br>
				{/* End of Like Here*/}
				{/* -----------------------------------------------------------------------------------------------------*/}
				{/* Start of comments */}
				<h3 class="text-success">Comments:</h3> <br></br>
				{
					<div className={comments.length > 0 ? 'post__comments' : ''}>
						{comments.map((comment) => (
							<p className="meta set-p-comment" >
								{/* {console.log(comment)} */}
								<strong>{comment.username}</strong> {comment.comment}{' '}
								{/* {console.log(comment)} */}
								{/* {comment.userId == uid ? <h1>can delete</h1> : null}{' '} */}
								{comment.userId === uid && (
									<span className='set-icon-clear'>
										<ClearIcon
											onClick={() => deleteComment(comment)}
											fontSize="small"
										/>
									</span>
								)}
								<br></br>
								{/* <p class="meta-2">{comment.timeStamp} </p> */}
								<p className="meta-2">
									{timeAgo(comment.timeStamp.seconds * 1000)}{' '}
								</p>
							</p>
						))}
					</div>
				}
				<form className="comment__form">
					<div className="comment__wrapper">
						<input
							className="comment__Input set-btn"
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
