//Profile


import React from 'react';
import { useState, useEffect } from 'react';

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
import useUserData from '../../hooks/useUserData';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { Avatar } from '@mui/material';
import { userCollection, postCollection } from '../../firebase.collection';
import { onSnapshot } from 'firebase/firestore';

export default function Profile() {
	const [profileData, setProfileData] = useState({});
	const [posts, setPosts] = useState(null);
	const [following, setFollowing] = useState(false);
	const [owner, setOwner] = useState(false);
	const [editing, setEditing] = useState(false);

	//const [userData, setUserData] = useState({});
	const { user, isLoading } = useUser();
	const [userFollowingPosts, setUserFollowingPosts] = useState([]);
	const [udata2, setUdata2] = useState([]);
	const params = useParams();
	const auth = getAuth();
	const { userData, isUserDataLoading } = useUserData();
	const [snapUser, setSnapUser] = useState(undefined);
	const [snapUserData, setSnapUserData] = useState(undefined);
	const [postArray, setPostArray] = useState(undefined);
	const [postArrayData, setPostData] = useState(undefined);

	const navigate = useNavigate();
	//Custom Hook

	useEffect(() => {
		async function fetchUserListings() {
			const postRef = collection(db, 'Posts');

			const q = query(
				postRef,
				where('userRef', '==', userData.uid),
				orderBy('timestamp', 'desc')
			);

			const querySnap = await getDocs(q);
			let post = [];
			querySnap.forEach((doc) => {
				return post.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setPosts(post);
		}

		fetchUserListings();
	}, [userData]);

	// useEffect(() => {
	// 	const unsubscribe = onSnapshot(postCollection, (snapshot) => {
	// 		setPostArray(
	// 			snapshot.docs.map((doc) => ({
	// 				id: doc.id,
	// 				data: doc.data(),
	// 			}))
	// 		);
	// 	});

	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, []);

	// useEffect(() => {
	// 	//let liket = dataForLike;
	// 	console.log(postArray);
	// 	if (postArray) {
	// 		let parray = postArray.map((doc) => {
	// 			if (user.uid === doc.data.userRef) return doc;
	// 		});
	// 		console.log(parray);
	// 		setPostData(parray[0] === undefined ? [] : parray);
	// 	}
	// 	//console.log(liket);
	// 	return () => {};
	// }, [postArray]);

	//snapshot user
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
		//let liket = dataForLike;
		if (snapUser) {
			let idArray = snapUser.map((doc) => {
				return doc.id;
			});
			let userIndex = idArray.indexOf(user.uid);
			let userData = snapUser[userIndex].data;
			setSnapUserData(userData);
			console.log(snapUserData);
		}
		return () => {};
	}, [snapUser]);

	function updateFollowing(profile) {
		for (let follower of profile.followers) {
			if (follower.email === user) {
				setFollowing(true);
				return userData.following;
			}
		}
		setFollowing(false);
	}

	if (profileData == {}) return null;

	return (
		<div>
			{
				<div className="profile">
					{/* <EditProfile
          user={user}
          show={editing}
          hideCallback={hideEditCallback}
          profileData={profileData}
          setAlert={setAlert}
        /> */}
					<div className="profile-banner">
						{/*Change this to User Name*/}
						{user ? <h1>{user.displayName}</h1> : null}
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
								<h2>
									{snapUserData && snapUserData.posts
										? snapUserData.posts.length
										: 0}
								</h2>
							</div>
							<div className="vertical-data">
								<p>
									<strong>Followers</strong>
								</p>
								<h2>
									{snapUserData && snapUserData.userfollowers
										? snapUserData.userfollowers.length
										: 0}
								</h2>
							</div>
							<div className="vertical-data">
								<p>
									<strong>Following</strong>
								</p>
								<h2>
									{snapUserData && snapUserData.userfollowing
										? snapUserData.userfollowing.length - 1
										: 0}
								</h2>
							</div>
							<div className="follow-button">
								{user ? (
									<Button
										variant="primary"
										onClick={() => navigate('/edit-profile')}
									>
										Edit
									</Button>
								) : null}
							</div>
						</div>
						<div className="profile-bio">
							<div className="profile-text set-bio">
								<span>
									{snapUserData && snapUserData.bio ? snapUserData.bio : null}
								</span>
							</div>
						</div>
					</div>
					<div className="break"></div>
					<div className="profile-posts-wrapper">
						<div className="profile-posts"></div>

						{/* <UserPosts alluserPosts={posts} /> */}
						<UserPosts alluserPosts={posts} />
					</div>
				</div>
			}
			){' '}
		</div>
	);
}
