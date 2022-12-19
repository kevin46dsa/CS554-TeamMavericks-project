import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import useUser from '../../hooks/useUser';
import { onSnapshot } from 'firebase/firestore';
import { postCollection } from '../../firebase.collection';

const Like = ({ id }) => {
	const { user, isLoading } = useUser();
	const [liked, setLiked] = useState(undefined);
	const [likeArray, setLikeArray] = useState(undefined);
	const [dataForLike, setdataForLike] = useState(undefined);

	useEffect(() => {
		const unsubscribe = onSnapshot(postCollection, (snapshot) => {
			setdataForLike(
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
		if (dataForLike) {
			let idArray = dataForLike.map((doc) => {
				return doc.id;
			});
			let userIndex = idArray.indexOf(id);
			let likeArray = dataForLike[userIndex].data.likes;
			setLikeArray(likeArray);
			let likeStatus = likeArray.includes(user.uid);
			setLiked(likeStatus);
		}
		//console.log(liket);
		return () => {};
	}, [dataForLike]);

	const changeLike = (likeStatus) => {
		const docRef = doc(db, 'Posts', id);
		//let likeArray2 = LikeData;
		console.log(likeArray);
		if (likeStatus) {
			if (likeArray.includes(user.uid)) {
				console.log('Inside Unlike');
				const index = likeArray.indexOf(user.uid);
				likeArray.splice(index, 1);
				setLikeArray(likeArray);
				console.log(likeArray);
				console.log('Unlike Success');
			}
		} else {
			if (!likeArray.includes(user.uid)) {
				console.log('Inside Like');
				likeArray.push(user.uid);
				setLikeArray(likeArray);
				console.log(likeArray);
				console.log('like Success');
			}
		}
		const data = {
			likes: likeArray,
		};
		updateDoc(docRef, data)
			.then((docRef) => {
				console.log('Value of an Existing Document Field has been updated');
				//console.log(commentPull.comments);
				setLiked(!liked);
			})
			.catch((error) => {
				console.log(error);
			});

		// logic to come
	};

	const handleLikeClick = async () => {
		// let likeData = dataForLike[0].data.likes;
		// console.log(likeData);
		// console.log(likeData.includes(user.uid));
		// let likeData = await getLikeData();
		changeLike(liked);

		// console.log('dataForLike');
		// console.log(dataForLike);
		//  console.log(likeData);
		// console.log('dataForLike');
	};

	return (
		<div data-testid="likeButton">
			{liked ? (
				<FavoriteIcon
					onClick={() => handleLikeClick()}
					color="secondary"
					style={{ marginRight: 8, width: 20, cursor: 'pointer' }}
				/>
			) : (
				<FavoriteBorder
					onClick={() => handleLikeClick()}
					style={{ marginRight: 8, width: 20, cursor: 'pointer' }}
				/>
			)}
		</div>
	);
};

export default Like;
