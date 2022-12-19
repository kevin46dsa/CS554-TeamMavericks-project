import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import firebase from "firebase";

const Like = ({ id }) => {
  const increment = 1
  const decrement = -1
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  db.auth().onAuthStateChanged(function (user) {
    if (user) {
      // eslint-disable-next-line
      likes.map(({ username }) => {
        if (username === db.auth().currentUser.displayName) {
          setLiked(true);
        }
      });
    }
  });


  useEffect(() => {
    db.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (id) {
          db.firestore()
            .collection("posts")
            .doc(id)
            .collection("likes")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              setLikes(
                snapshot.docs.map((doc) => ({
                  username: doc.data().username,
                  timestamp: doc.data().timestamp,
                }))
              );
            });
        }
      }
    });
    // eslint-disable-next-line
  }, []);


  const handleLikeClick = () => {
    const post = db.firestore().collection("Posts").doc(id);
    if (liked) {
        db.firestore()
        .collection("posts")
        .doc(id)
        .collection("likes")
        .doc(db.auth().currentUser.displayName)
        .delete()
        .then(() => {
          post.update({ likes: decrement });
          setLiked(false);
        })
        .catch((error) => {
          console.error("Error removing user: ", error);
        });
    } else {
        db.firestore()
        .collection("posts")
        .doc(id)
        .collection("likes")
        .doc(db.auth().currentUser.displayName)
        .set({
          username: db.auth().currentUser.displayName,
          timestamp: db.firestore.FieldValue.serverTimestamp(),
        });
      post.update({ likes: increment });
      setLiked(true);
    }
  };



  return (
    <div data-testid="likeButton">
      {liked ? (
        <FavoriteIcon
          onClick={() => handleLikeClick()}
          color="secondary"
          style={{ marginRight: 8, width: 20, cursor: "pointer" }}
        />
      ) : (
        <FavoriteBorder
          onClick={() => handleLikeClick()}
          style={{ marginRight: 8, width: 20, cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default Like;