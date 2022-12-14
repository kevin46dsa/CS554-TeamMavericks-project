import React from 'react';
import './Post.css';
import { Avatar } from '@mui/material';

const Post = ({ username, caption, imageUrl }) => {
	return (
		<>
			<div className="post">
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
			</div>
		</>
	);
};

export default Post;
