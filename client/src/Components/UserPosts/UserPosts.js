import React, { useState, useEffect } from 'react';

import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { db } from '../../firebase';
import queries from '../../queries/queries';
import { getDocs, doc, getDoc } from 'firebase/firestore';
import useUser from '../../hooks/useUser';

const useStyles = makeStyles({
	card: {
		maxWidth: 250,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
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
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12,
	},
});

const UserPosts = ({alluserPosts}) => {
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [loading, setLoading] = useState(true);


	//My code test

	const {user, isLoading} = useUser();
	const [posts, setPosts] = useState({})
	const [postData, setPostData] = useState({})
	


	


	//end of my code test


	let card = null;
	const [data, setData] = useState(null);
	

	const buildCard = (post) => {
		return (
			<Grid item xs={24} sm={6} md={8} lg={5
			} xl={2} key={post.id}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<CardContent>
							{post.data.ownerName}
							<br />
							<CardMedia
								className={classes.media}
								component="img"
								image={post.data.imgURL}
							/>
							<br />
							{post.data.caption}
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
			<Grid container className={classes.grid} spacing={8}>
				{card}
			
			</Grid>
		</div>
	);
};

export default UserPosts;
