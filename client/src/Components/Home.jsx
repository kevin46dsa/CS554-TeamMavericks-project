import React from 'react';
import { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import axios from 'axios';
import queries from '../queries/queries';
import { getDocs, getDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Post from './Post/Post';
import { db } from '../firebase';

const Home = () => {
	const { user, isLoading } = useUser();
	const [on, setON] = useState(false);
	const [mostLiked, setMostLiked] = useState(null);
	const [userFollowingPosts, setUserFollowingPosts] = useState([]);

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
		async function fetchUserFollowingPosts() {
			try {
				// execute the query
				// create query to get user following array of this specific user.uid
				if (user.uid) {
					const docRef = doc(db, 'users', user.uid);
					const docSnap = await getDoc(docRef);
					let userFollowing = [];
					if (docSnap.exists()) {
						let userData = docSnap.data();
						userFollowing = userData.userfollowing;
					} else {
						console.log('docSnap Does not exist');
					}
					if (userFollowing.length == 0)
						console.log('No User Data user following lenght 0');
					const querySnapshot = await getDocs(
						queries.userFollowingPostsHome(userFollowing)
					);

					//Calling the clean function for all the data
					const userFollowingPostsData = cleanData(querySnapshot);

					setUserFollowingPosts(userFollowingPostsData);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchUserFollowingPosts();
	}, [user]);

	useEffect(() => {
		async function fetchMostLikedPosts() {
			try {
				// execute the query
				// create query to get user following array of this specific user.uid
				if (user.uid) {
					const docRef = doc(db, 'users', user.uid);
					const docSnap = await getDoc(docRef);
					let userFollowing = [];
					if (docSnap.exists()) {
						let userData = docSnap.data();
						userFollowing = userData.userfollowing;
					} else {
						console.log('docSnap Does not exist');
					}
					if (userFollowing.length == 0)
						console.log('No User Data user following lenght 0');
					const querySnapshot = await getDocs(
						queries.mostLikedPosts(userFollowing)
					);

					//Calling the clean function for all the data
					const mostLikedPosts = cleanData(querySnapshot);

					setMostLiked(mostLikedPosts);
				}
			} catch (error) {
				console.log(error);
			}
		}
		fetchMostLikedPosts();
	}, [user]);

	const setONHandle = () => {
		//fetch data

		//set state of userfoll
		setON(!on);
	};

	return (
		<>
			{/* <div>{user ? <h1>Home user logged in {data}</h1> : <h1>No user</h1>}</div> */}
			{user ? (
				<button
					onClick={() => {
						setON(!on);
					}}
				>
					Most Liked Posts {on ? <p>true</p> : null}
				</button>
			) : null}
			<div className="timeline">
				{on ? (
					<>
						{mostLiked.map((post) => (
							<Post allData={post} />
						))}
					</>
				) : (
					<>
						{userFollowingPosts.map((post) => (
							<Post allData={post} />
						))}
					</>
				)}
				{/* {userFollowingPosts.map((post) => (
					<Post allData={post} />
				))} */}
			</div>
		</>
	);
};

export default Home;
