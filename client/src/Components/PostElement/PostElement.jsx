import React, { useState, useEffect } from 'react';
import '../Post/Post.css';
import { Avatar } from '@mui/material';
import { postCollection, userCollection } from '../../firebase.collection';
import { Timestamp } from '@firebase/firestore';
import timeAgo from 'epoch-timeago';
import Like from '../Like/Like';
import ClearIcon from '@mui/icons-material/Clear';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//import { db } from '../../App';
import { doc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useUser from '../../hooks/useUser';
import LostTrack from '../LostTrack';

const PostElement = () => {
	const navigate = useNavigate();
	let { id } = useParams();
	let allData = {
		id: 'PCXOj062mepUYbLow1dL',
		data: {
			userRef: '',
			ownerName: '',
			likes: [],
			imgURL: '',
			caption: '',
			comments: [],
			timestamp: '',
		},
	};
	// ID Params is here
	//console.log(id);
	const { user, isLoading } = useUser();
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState(allData.data.comments);
	const [likeArray, setLikeArray] = useState(undefined);
	const [dataForComment, setdataForComment] = useState(undefined);
	const [uid, setUid] = useState(undefined);
	const [postData, setPostData] = useState(undefined);
	const [snapUser, setSnapUser] = useState(undefined);
	const [liked, setLiked] = useState(undefined);
	const [snapUserData, setSnapUserData] = useState(undefined);
	const [imageURI, setImageURL] = useState(undefined);
	const [editting, setEditting] = useState(false);
	const [newCaption, setNewCaption] = useState(false);
	let username = allData.data.ownerName;
	let caption = allData.data.caption;
	let imageUrl = allData.data.imgURL;
	let postId = id;
	let posterId = allData.data.userRef;

	let docRef;
	//const [commentPull, setCommentPull] = useState([]);

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

			let userIndex = idArray.indexOf(id);
			// console.log(dataForComment);
			// console.log(user.uid);
			// console.log(userIndex);
			let comments = dataForComment[userIndex].data.comments;
			let likeArray = dataForComment[userIndex].data.likes;
			let u = dataForComment[userIndex].data;
			setPostData(dataForComment[userIndex].data);
			console.log(u);
			// console.log(comments);
			setUid(user.uid);
			setComments(comments);
			setLikeArray(likeArray);
		}
		//console.log(liket);
		return () => {};
	}, [dataForComment]);

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
			let userData = snapUser[userIndex].data;

			setSnapUserData(userData);
		}
		return () => {};
	}, [snapUser]);

	useEffect(() => {
		axios
			.get('http://localhost:8000/data/getpost/' + id)
			.then((res) => {
				let image = res.data.imgURL;
				setImageURL(image);
			})
			.catch((e) => {
				console.log(e);
			});

		return () => {};
	}, []);

	const deleteComment = (comment) => {
		const docRef = doc(db, 'Posts', postId);
		const index = comments.indexOf(comment);
		let newComments = comments;
		// console.log(newComments);
		// console.log(comment);
		// console.log(index);
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

	async function onDelete(PostId) {
		if (window.confirm('Are you sure you want to delete?')) {
			navigate('/profile');

			const docRef = doc(db, 'users', user.uid);
			let post = snapUserData.posts;
			const index = post.indexOf(PostId);
			post.splice(index, 1);

			const data = {
				posts: post,
			};
			updateDoc(docRef, data)
				.then((docRef) => {
					console.log('Value of an Existing Document Field has been updated');
					//console.log(commentPull.comments);
					setLiked(!liked);
				})
				.catch((error) => {
					console.log(error);
				});

			await deleteDoc(doc(db, 'Posts', PostId));
			//setPostDeleted(true);
		}

		// remove post id from user collection

		// there is a bug here needs attention
		// onSnapshot or set state
	}

	const editProfile = (e) => {
		e.preventDefault();
		let caption = newCaption;
		console.log('Start Editting');
		const docRef = doc(db, 'Posts', id);

		const data = {
			caption: caption,
		};
		updateDoc(docRef, data)
			.then((docRef) => {
				console.log('Value of an Existing Document Field has been updated');
				//console.log(commentPull.comments);
				setLiked(!liked);
				setEditting(!editting);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (postData) {
		return (
			<>
				<div className="post" key={allData.id}>
					<div className="post__header">
						{/* Header: avatar with username */}
						<Avatar
							alt={postData.ownerName}
							src="/static/images/avatar/1.jpg"
						/>

						<h3>{postData.ownerName}</h3>

						{postData.userRef === user.uid ? (
							<>
								<EditIcon onClick={() => setEditting(!editting)} />
								<DeleteIcon
									onClick={() => {
										onDelete(id);
									}}
								/>
							</>
						) : null}
					</div>
					{/* Image */}
					<img className="post__image" src={imageURI} alt="" />
					{/* Username + caption */}
					<h4 className="post__text">
						<strong>{postData.ownerName}</strong>{' '}
						{editting ? (
							<>
								<form onSubmit={editProfile}>
									<input
										type="text"
										name="caption"
										placeholder={postData.caption}
										onChange={(e) => {
											setNewCaption(e.target.value);
										}}
									/>
									<button type="submit">Submit</button>
								</form>
							</>
						) : (
							postData.caption
						)}
					</h4>
					{/* <Like></Like> */}
					{/* <Like id={allData.id} /> */}
					{/* Like Shit Here*/}
					<h3 class="text">Likes:{likeArray && likeArray.length}</h3> <br></br>
					<Like id={postId} className="post-iconItem" />
					<br></br>
					{/* End of Like Here*/}
					{/* ----------------------------------------------------------------------------------------------------------------*/}
					{/* Start of comments */}
					<h3 class="text">Comments:</h3> <br></br>
					{
						<div className={comments.length > 0 ? 'post__comments' : ''}>
							{comments.map((comment) => (
								<p className="meta set-p-comment">
									{/* {console.log(comment)} */}
									<strong>{comment.username}</strong> {comment.comment}{' '}
									{/* {console.log(comment)} */}
									{/* {comment.userId == uid ? <h1>can delete</h1> : null}{' '} */}
									{comment.userId === uid && (
										<span className="set-icon-clear">
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
	}

	//else navigate("/error")
};

export default PostElement;
