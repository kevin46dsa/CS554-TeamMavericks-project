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
import { userCollection } from '../../firebase.collection';
import { onSnapshot } from 'firebase/firestore';

export default function PublicProfile() {
    const params = useParams();
	const [profileData, setProfileData] = useState({});
	const [posts, setPosts] = useState(null);
	const [following, setFollowing] = useState(false);
	const [owner, setOwner] = useState(false);
	const [editing, setEditing] = useState(false);

	//const [userData, setUserData] = useState({});
	const { user, isLoading } = useUser();
	const [userFollowingPosts, setUserFollowingPosts] = useState([]);
	const [udata2, setUdata2] = useState([]);
	
	const auth = getAuth();
	const { userData, isUserDataLoading } = useUserData();
	const [snapUser, setSnapUser] = useState(undefined);
	const [snapUserData, setSnapUserData] = useState(undefined);

	const navigate = useNavigate();
	//Custom Hook

	useEffect(() => {
		 function fetchUserListings() {
			let data = {
                uuid: params.id
            };
            
            axios
				.get('http://localhost:8000/data/getUserPosts', data)
				.then((res) => {
					console.log('Executed 1st block');
					console.log(res)
				})
				.catch((e) => {
					console.log(e);
				});


            /*
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
            */
		}

		fetchUserListings();
	}, []);

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
								src={profileData.photo ? profileData.photo.asset.url : null}
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
								{user && !owner ? (
									<Button
										variant={following ? 'danger' : 'success'}
										// onClick={followClick}
									></Button>
								) : null}
								{user && owner ? (
									<Button variant="primary" onClick={() => setEditing(true)}>
										Edit
									</Button>
								) : null}
							</div>
						</div>
						<div className="profile-bio">
							<div className="profile-name">
								<strong>
									{(profileData.first_name ? profileData.first_name : '') +
										' ' +
										(profileData.last_name ? profileData.last_name : '')}
								</strong>
							</div>
							<div className="profile-text">{profileData.bio}</div>
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
