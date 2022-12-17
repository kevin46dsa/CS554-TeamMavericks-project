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

import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

export default function Profile({ setAlert }) {
	const [profileData, setProfileData] = useState({});
	const [posts, setPosts] = useState({});
	const [following, setFollowing] = useState(false);
	const [owner, setOwner] = useState(false);
	const [editing, setEditing] = useState(false);
	const [userData, setUserData] = useState({});
	const { user, isLoading } = useUser();
	const [userFollowingPosts, setUserFollowingPosts] = useState([]);
	const [udata2, setUdata2] = useState([]);
	const params = useParams();
	const auth = getAuth();

	const navigate = useNavigate();
	//Custom Hook

	function onLogout() {
		auth
			.signOut()
			.then(() => {
				alert('User Signed out');
				navigate('/login');
			})
			.catch(() => {
				alert('Error with signning out');
			});
	}
	const cleanData = (array) => {
		const posts = [];
		array.forEach((doc) => {
			return posts.push({
				id: doc.id,
				data: doc.data(),
			});
		});

		return posts;
	};

	useEffect(() => {
		async function fetchUserData() {
			// execute the query
			// create query to get user following array of this specific user.uid
			if (user.uid) {
				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);
				let usersData = undefined;
				if (docSnap.exists()) {
					usersData = docSnap.data();
				}

				//Calling the clean function for all the data

				console.log(usersData);
				console.log(usersData.userfollowers.length);
				let uData = [];

				if (userData) {
					uData.push({
						posts: usersData.posts,
						userfollowers: usersData.userfollowers,
						userfollowing: usersData.userfollowing,
					});
					console.log(uData);
				}
				setUdata2(uData);
			}
		}
		//setCurrentUser(auth.currentUser.username)
		fetchUserData(userData);
	}, [user]);
	

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
	console.log(udata2);
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
						<button
							type="button"
							className="btn btn-danger btn-lg"
							onClick={onLogout}
						>
							Log Out
						</button>
						<div className="profile-data">
							<img
								src={
									profileData.photo
										? profileData.photo.asset.url
										: 'https://via.placeholder.com/80'
								}
								id="profile-img"
							/>
							<div className="vertical-data">
								<p>
									<strong>Posts</strong>
								</p>
								<h4>
									
									{udata2.posts != []
										? udata2[0].posts.length
										: 0}
								</h4>
							</div>
							<div className="vertical-data">
								<p>
									<strong>Followers</strong>
								</p>
								<h4>
									{console.log('DATAAAAAA::')}
									{console.log(udata2.userfollowing)}
									{udata2.userfollowers != []
										? udata2[0].userfollowers.length
										: 0}
								</h4>
							</div>
							<div className="vertical-data">
								<p>
									<strong>Following</strong>
								</p>
								<h4>
										
								{udata2.userfollowing != []
										? udata2[0].userfollowing.length
										: 0}
								</h4>
							</div>
							<div className="follow-button">
								{user && !owner ? (
									<Button
										variant={following ? 'danger' : 'success'}
										// onClick={followClick}
									>
										{following ? 'Unfollow' : 'Follow'}
									</Button>
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
						<UserPosts />
					</div>
				</div>
			}
			){' '}
		</div>
	);
}
