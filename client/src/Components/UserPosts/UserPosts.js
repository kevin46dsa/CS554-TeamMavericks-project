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
	console.log(alluserPosts)
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [loading, setLoading] = useState(true);


	//My code test

	const {user, isLoading} = useUser();
	const [posts, setPosts] = useState({})
	const [postData, setPostData] = useState({})
	const [pData1, setpData1] = useState([])



	const cleanData = (array)=>{
		const posts= [];

		array.forEach((doc) => {
			return posts.push({
				id: doc.id,
				data: doc.data()
			})
			
		});


		return posts
	}


	useEffect(()=>{
		async function fetchPostData(){



			if(user.uid){
				const docRef = doc(db, 'posts',)
				console.log(docRef[0].uid)
				const docSnap = await getDoc(docRef.id)
				console.log(docSnap)
				let postsData = undefined

				if(docSnap.exists()){
					postsData = docSnap.data()
				}


				console.log(postData)

				let pData = []

				if(postData){
					if(user.uid === docRef[0].id){
					pData.push({
						uid: postData.uid,
						imageUrl: postData.imgUrl
					})
				}
					console.log(pData)
				}

				setpData1(pData)
			}


		}


		fetchPostData(postData)
	}, [user])


	//end of my code test


	const [userPost, setUserPost] = useState([
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
		{
			username: 'blessed',
			caption: "I'm Amazing!",
			imageUrl:
				'https://images.unsplash.com/photo-1637014387463-a446e89abb68?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		},
		{
			username: 'god',
			caption: "Oh, I'm a God!",
			imageUrl:
				'https://images.unsplash.com/photo-1637019838019-5f14d84ee308?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
		},

		{
			username: 'AND',
			caption: ' Messi :)',
			imageUrl:
				'https://cdn.vox-cdn.com/thumbor/PcCY52M3SwG0vKlhPpMRSV6Pkyg=/0x0:7053x4702/1200x800/filters:focal(3235x0:4363x1128)/cdn.vox-cdn.com/uploads/chorus_image/image/71705677/1245337015.0.jpg',
		},
	]);

	let card = null;
	const [data, setData] = useState(null);
	//   useEffect(() => {
	//     axios
	//         .get('http://localhost:3000/userPosts')
	//         .then((response) => {
	//             setData(response);
	//         })
	//         .catch(() => {
	//             console.log('Error with use effect');
	//         });
	// }, []);

	//   const buildCard = (post) => {
	//     console.log("Hello")
	//     console.log(userPost)
	//     return (

	//       <Grid

	//             {post.imageUrl}
	// {
	// 	<CardActionArea>
    //         <CardMedia
    //           className={classes.media}
    //           component="img"
    //           alt={post.name}
    //          image={
    //             post.imageUrl
    //          }
            
    //         />
          
    //           <CardContent>
    //             <Typography
    //               className={classes.titleHead}
    //               gutterBottom
    //               variant="h6"
    //               component="h2"
    //             >
    //               {post.username}
    //             </Typography>
    //             <Typography color="textSecondary" component="p">
    //               {post.caption}
    //             </Typography>
                
    //           </CardContent>
          
    //       </CardActionArea> 
	// }
	//         </Card>
	//       </Grid>
	//     );
	//   };
	//         console.log('hi')
	//       return (
	//         <div>
	//           <Grid container className={classes.grid} spacing={5}>
	//             {card}
	//           </Grid>
	//         </div>
	//       );

	const buildCard = (post) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={post.id}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<CardContent>
							{post.username}
							<br />
							<CardMedia
								className={classes.media}
								component="img"
								image={post.imageUrl}
							></CardMedia>
							<br />
							{post.caption}
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
			// <>
			//     {/* <div>{user ? <h1>Home user logged in {data}</h1> : <h1>No user</h1>}</div> */}
			//     <div className="timeline">
			//         {userPost.map((post) => (

			//             post.username,
			//             post.caption,
			//             post.imageUrl

			//         ))}
			//     </div>
			// </>
		);
	};

	card =
		pData1 &&
		pData1.map((post) => {
			return buildCard(post);
		});

	return (
		<div>
			<Grid container className={classes.grid} spacing={5}>
				{card}
			</Grid>
		</div>
	);
};

export default UserPosts;
