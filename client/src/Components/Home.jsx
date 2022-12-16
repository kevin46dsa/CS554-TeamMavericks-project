import React from 'react';
import { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import axios from 'axios';
import queries from '../queries/queries';
import { getDocs, getDoc , doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Post from './Post/Post';
import { db } from "../firebase";

const Home = () => {
	const { user, isLoading } = useUser();
	const [data, setData] = useState(null);
	const [userFollowingPosts, setUserFollowingPosts] = useState([]);
		/*
		[
		{
			username: 'blessingthebobo',
			caption: "Wow, I'm Amazing!",
			imageUrl:
				'https://images.unsplash.com/photo-1637014387463-a446e89abb68?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		},
		{
			username: 'godtello',
			caption: "Oh, I'm a God!",
			imageUrl:
				'https://images.unsplash.com/photo-1637019838019-5f14d84ee308?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		},

		{
			username: 'Achal',
			caption: 'Ankara Messi :)',
			imageUrl:
				'https://cdn.vox-cdn.com/thumbor/PcCY52M3SwG0vKlhPpMRSV6Pkyg=/0x0:7053x4702/1200x800/filters:focal(3235x0:4363x1128)/cdn.vox-cdn.com/uploads/chorus_image/image/71705677/1245337015.0.jpg',
		},
	]
	*/

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
				if(user.uid){
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);
				let userFollowing = []
				if (docSnap.exists()) {
				  let userData = docSnap.data();
				  userFollowing = userData.userfollowing
				} 
				else {
					console.log('docSnap Does not exist')
				}
				if(userFollowing.length == 0) console.log("No User Data user following lenght 0")
				const querySnapshot = await getDocs(queries.userFollowingPostsHome(userFollowing));
				
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



	return (
		<>
			{/* <div>{user ? <h1>Home user logged in {data}</h1> : <h1>No user</h1>}</div> */}
			<div className="timeline">
				{userFollowingPosts.map((post) => (
					<Post 
						allData={post}
					
					/>
				))}

			
			</div>
		</>
	);
};

export default Home;
