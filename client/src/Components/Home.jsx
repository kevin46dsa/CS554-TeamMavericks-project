import React from 'react';
import { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import axios from 'axios';

import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Post from './Post/Post';

const Home = () => {
	const { user, isLoading } = useUser();
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:4000/action/getnames')
			.then((response) => {
				setData(response);
			})
			.catch(() => {
				console.log('Error with use effect');
			});
	}, []);

	const [posts, setPosts] = useState([
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
			caption: "Ankara Messi :)",
			imageUrl:
				'https://cdn.vox-cdn.com/thumbor/PcCY52M3SwG0vKlhPpMRSV6Pkyg=/0x0:7053x4702/1200x800/filters:focal(3235x0:4363x1128)/cdn.vox-cdn.com/uploads/chorus_image/image/71705677/1245337015.0.jpg',
		},
	]);

	return (
		<>
			{/* <div>{user ? <h1>Home user logged in {data}</h1> : <h1>No user</h1>}</div> */}
			<div className="timeline">
				{posts.map((post) => (
					<Post
						username={post.username}
						caption={post.caption}
						imageUrl={post.imageUrl}
					/>
				))}
			</div>
		</>
	);
};

export default Home;
