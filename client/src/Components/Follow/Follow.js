// import { useState, useEffect, React} from "react";
// import firebase from 'firebase';
// import Avatar from "@material-ui/core/Avatar";
// import { db } from "../../firebase";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";

// import { Link } from "react-router-dom";

// const Follow = () => {
//   const [users, setUsers] = useState([]);
//   const [following, setFollowing] = useState([]);

//   useEffect(() => {
//     db.collection("users").onSnapshot((snapshot) => {
//       setUsers(
//         snapshot.docs.map((doc) => ({
//           user: doc.data().username,
//         }))
//       );
//     });
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         db
//           .collection("users")
//           .doc(firebase.auth().currentUser.displayName)
//           .collection("following")
//           .onSnapshot((snapshot) => {
//             setFollowing(
//               snapshot.docs.map((doc) => ({
//                 username: doc.data().username,
//               }))
//             );
//           });
//       } else {
//         // No user is signed in.
//       }
//     });
//     // eslint-disable-next-line
//   }, []);

//   function isFollowed(user) {
//     let follow = false;

//     // eslint-disable-next-line
//     following.map(({ username }) => {
//       if (user === username) {
//         follow = true;
//       }
//     });

//     if (follow) {
//       return true;
//     }
//     return false;
//   }

//   const followUser = (user) => {
//     db
//       .collection("users")
//       .doc(user)
//       .collection("follower")
//       .doc(firebase.auth().currentUser.displayName)
//       .set({
//         username: firebase.auth().currentUser.displayName,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//     db
//       .collection("users")
//       .doc(firebase.auth().currentUser.displayName)
//       .collection("following")
//       .doc(user)
//       .set({
//         username: user,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//       });
//   };

//   const unFollowUser = (username) => {
//     db
//       .collection("users")
//       .doc(firebase.auth().currentUser.displayName)
//       .collection("following")
//       .doc(username)
//       .delete()
//       .then(() => { 
//         //intentionally-blank override
//       })
//       .catch((error) => {
//         console.error("Error removing user: ", error);
//       });

//     db
//       .collection("users")
//       .doc(username)
//       .collection("follower")
//       .doc(firebase.auth().currentUser.displayName)
//       .delete()
//       .then(() => {
//         // intentionally-blank override
//       })
//       .catch((error) => {
//         console.error("Error removing user: ", error);
//       });
//   };



//   return (
//     <div className="follow-wrapContainer">
//       <h4 className="follow-hoverButton" data-testid="test-sidebarExplore">Explore</h4>

//       <div className="follow-container">
//         <p className="follow-groupTitle" data-testid="test-sidebarTitle"> 
//           People you may know 
//         </p> 
//         <h4 className="user-description" data-testid="test-userDescription">
//           {users.map(({ user }) => (
//             <div>
//               {user !== firebase.auth().currentUser.displayName && (
//                 <div className="follow-userLine">
//                   <Grid className="follow-userName">
//                     <Avatar
//                       className="user-avatar"
//                       src="/broken-image.jpg"
//                       style={{ width: 35, height: 35 }}
//                     ></Avatar>
//                     <Link to={`/${user}`} className="nav-link"> 
//                       <p className="follow-nameLink">{user}</p>
//                     </Link>
//                   </Grid>
//                   <Grid>
//                     {isFollowed(user) ? (
//                       <Button
//                         className="follow-button"
//                         style={{ color: "DodgerBlue" }}
//                         onClick={() => unFollowUser(user)}
//                       >
//                         Unfollow
//                       </Button>
//                     ) : (
//                       <Button
//                         className="follow-button"
//                         variant="contained"
//                         color="primary"
//                         onClick={() => followUser(user)}
//                       >
//                         {" "}
//                         Follow{" "}
//                       </Button>
//                     )}
//                   </Grid>
//                 </div>
//               )}
//             </div>
//           ))}
//         </h4>
//       </div>
//     </div>
//   );
// };

// export default Follow;