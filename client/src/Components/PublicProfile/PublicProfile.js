import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import OAuth from '../OAuth/OAuth';

import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import EditProfile from '../EditProfile/EditProfile';
import '../profile/profile.css';
import useUser from '../../hooks/useUser';
import UserPosts from '../UserPosts/UserPosts';
import { getAuth, updateProfile } from 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import { Avatar } from '@mui/material';
import { postCollection, userCollection } from '../../firebase.collection';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';

export default function PublicProfile() {
	const [posts, setPosts] = useState(null);
	const [following, setFollowing] = useState(false);
	const [owner, setOwner] = useState(false);
	const [editing, setEditing] = useState(false);
	const [numUser, setNumUser] = useState(0);
	const [numPost, setNumPost] = useState(0);
	//const [userData, setUserData] = useState({});
	const { user, isLoading } = useUser();
	const [userFollowingPosts, setUserFollowingPosts] = useState([]);
	const [udata2, setUdata2] = useState([]);

	const auth = getAuth();

	const [snapUser, setSnapUser] = useState(undefined);
	const [snapUserData, setSnapUserData] = useState(undefined);
	const [snapPosts, setSnapPosts] = useState(undefined);
	const [snapCurrentUserData, setSnapCurrentUserData] = useState(undefined);
	const [followStatus, setFollowStatus] = useState();
	const navigate = useNavigate();
	//Custom Hook
	let { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get(
					` http://localhost:8000/data/getUserPosts/${id}`
				);
				setPosts(data);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [id]);

	//snapshot user

	useEffect(() => {
		const unsubscribe = onSnapshot(userCollection, (snapshot) => {
			setSnapUser(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
			// setNumUser(numUser++);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		//let liket = dataForLike;
		if (snapUser) {
			let idArray = snapUser.map((doc) => {
				return doc.id;
			});
			let userIndex = idArray.indexOf(id);
			let CurrentuserIndex = idArray.indexOf(user.uid);
			let userData = snapUser[userIndex].data;

			let CurrentuserData = snapUser[CurrentuserIndex].data;
			setSnapUserData(userData);
			setSnapCurrentUserData(CurrentuserData);

			//setting follow status
			if (snapCurrentUserData) {
				let following = snapCurrentUserData.userfollowing.includes(id); // Data of current user
				setFollowStatus(following ? true : false);
			}

			//		console.log(snapUserData);
		}
		return () => {};
	}, [snapUser, snapCurrentUserData]);
	// useEffect(() => {
	// 	if(snapUser){
	// 		if(numUser > 1)flushRedis()

	// 	}
	// 	return () => {

	// 	};
	// }, [snapUser,numUser]);

	useEffect(() => {
		const unsubscribe = onSnapshot(postCollection, (snapshot) => {
			setSnapPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
			// setNumPost(numPost++);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const followHandle = () => {
		if (followStatus === false) {
			//logic to follow
			//currentuser - logged in      ------> user.uid
			//otheruser - profile we are on -----> id

			let currentUser = snapCurrentUserData;

			currentUser.userfollowing.push(id);
			// console.log(currentUser.userfollowing);
			//setSnapCurrentUserData(currentUser);
			let docRef = doc(db, 'users', user.uid);
			let data = {
				userfollowing: currentUser.userfollowing,
			};
			updateDoc(docRef, data)
				.then((docRef) => {
					console.log('following +1');
				})
				.catch((error) => {
					console.log(error);
				});

			let otherUser = snapUserData;
			// console.log(otherUser);
			console.log(otherUser.userfollowers);
			otherUser.userfollowers.push(user.uid);
			console.log(otherUser.userfollowers);
			let docRef2 = doc(db, 'users', id);
			data = {
				userfollowers: otherUser.userfollowers,
			};
			updateDoc(docRef2, data)
				.then((docRef) => {
					console.log('follower +1');
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			//logic to unfollow
			let currentUser = snapCurrentUserData.userfollowing;
			let index = currentUser.indexOf(id);
			currentUser.splice(index, 1);
			// console.log(currentUser.userfollowing);
			//setSnapCurrentUserData(currentUser);
			let docRef = doc(db, 'users', user.uid);
			let data = {
				userfollowing: currentUser,
			};
			updateDoc(docRef, data)
				.then((docRef) => {
					console.log('following +1');
				})
				.catch((error) => {
					console.log(error);
				});

			let otherUser = snapUserData.userfollowers;
			index = otherUser.indexOf(user.uid);
			otherUser.splice(index, 1);
			let docRef2 = doc(db, 'users', id);
			data = {
				userfollowers: otherUser,
			};
			updateDoc(docRef2, data)
				.then((docRef) => {
					console.log('follower +1');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (
		<div>
			{
				<div className="profile">
					<div className="profile-banner">
						{/*Change this to User Name*/}
						{user ? <h1>{snapUserData && snapUserData.name}</h1> : null}
						<br />

						<div className="profile-data">
							<Avatar
								alt="Remy Sharp"
								src={
									snapUserData && snapUserData.displayPicture
										? snapUserData.displayPicture
										: null
								}
								sx={{ width: 100, height: 100 }}
							/>
							<div className="vertical-data">
								<p>
									<strong>Posts</strong>
								</p>
								<h4>
									{snapUserData && snapUserData.posts
										? snapUserData.posts.length
										: 0}
								</h4>
							</div>
							<div className="vertical-data">
								<p>
									<strong>Followers</strong>
								</p>
								<h4>
									{snapUserData && snapUserData.userfollowers
										? snapUserData.userfollowers.length
										: 0}
								</h4>
							</div>
							<div className="vertical-data">
								<p>
									<strong>Following</strong>
								</p>
								<h4>
									{snapUserData && snapUserData.userfollowing
										? snapUserData.userfollowing.length - 1
										: 0}
								</h4>
							</div>
							<div className="follow-button">
								{user && id == user.uid ? null : (
									<button onClick={followHandle}>
										{followStatus ? 'Unfollow' : 'Follow'}
									</button>
								)}
							</div>
						</div>
						<div className="profile-bio">
							<div className="profile-text">
								{snapUserData && snapUserData.bio ? snapUserData.bio : null}
							</div>
						</div>
					</div>
					<div className="break"></div>
					<div className="profile-posts-wrapper">
						<div className="profile-posts">
							{/* {posts && posts.length > 0
              ? posts.map((post, idx) => {
                  return <img src={post.photo.asset.url} key={idx} />;
                })
              : null} */}
						</div>

						<UserPosts alluserPosts={posts} />
					</div>
				</div>
			}
			){' '}
		</div>
	);
}
