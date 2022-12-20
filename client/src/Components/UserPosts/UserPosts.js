import React, { useState, useEffect } from 'react';

import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Modal,
	Button,
	Typography,
	Box,
} from '@mui/material';

//import { makeStyles } from '@mui/styles';
import { GlobalStyles } from '@mui/material';
import { db } from '../../firebase';
import queries from '../../queries/queries';
import { getDocs, doc, getDoc } from 'firebase/firestore';
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
// import { post } from '../../../../server/routes/authRoutes';
const style = {
	position: 'absolute',
	top: '55%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '30%',

	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
const useStyles = {
	card: {
		// maxWidth: 250,
		// height: 'auto',
		// marginLeft: 'auto',
		// marginRight: 'auto',
		// borderRadius: 5,
		border: '1px solid #1e8678',
		// boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
		height: '100%',
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold',
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row',
	},
	media: {
		height: '100%',
		width: '100%',
		// height: 167.14,
		// width: 130,
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12,
	},
};

const UserPosts = ({ alluserPosts }) => {
	const navigate = useNavigate();
	const regex = /(<([^>]+)>)/gi;
	// const classes = useStyles();
	const [loading, setLoading] = useState(true);

	//My code test

	const { user, isLoading } = useUser();
	const [posts, setPosts] = useState({});
	const [postData, setPostData] = useState({});
	const [open, setOpen] = useState(false);
	//end of my code test

	let card = null;
	const [data, setData] = useState(null);

	// const closePost = () => setOpen(false);

	const buildCard = (post) => {
		// console.log(post);
		return (
			<Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={post.id}>
				<Card
					sx={useStyles.card}
					variant="outlined"
					onClick={() => {
						navigate('/post/' + post.id);
					}}
				>
					<CardActionArea>
						<CardContent>
							<br />
							<CardMedia
								sx={useStyles.media}
								component="img"
								image={post.data.imgURL}
							/>
							<br />
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	card =
		alluserPosts &&
		alluserPosts.map((post) => {
			return buildCard(post);
		});

	return (
		<div>
			<h2>POSTS:</h2>
			<br />
			<hr />
			<Grid container sx={useStyles.grid} spacing={0.5}>
				{card}
			</Grid>
		</div>
	);
};

export default UserPosts;
