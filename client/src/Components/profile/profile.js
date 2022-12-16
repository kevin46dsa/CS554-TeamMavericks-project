import React from 'react';
import { useState, useEffect } from "react";

//import OAuth from '../OAuth/OAuth';

import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import EditProfile from '../EditProfile/EditProfile';
import "../profile/profile.css";
import useUser from '../../hooks/useUser';
import UserPosts from '../UserPosts/UserPosts';
import { getAuth, updateProfile } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function Profile({ setAlert }) {
    const [profileData, setProfileData] = useState({});
    const [posts, setPosts] = useState({});
    const [following, setFollowing] = useState(false);
    const [owner, setOwner] = useState(false);
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({})
    const params = useParams();
    const auth = getAuth();
    const navigate = useNavigate();
    //Custom Hook 
    const {user,isLoading} = useUser()
    console.log(user)
    
    
    function onLogout() {
      auth.signOut().then(()=>{
      alert("User Signed out")
      navigate("/login");
      }).catch(()=>{
      alert("Error with signning out")
      })
      
    }



    useEffect(() => {
      async function fetchUserData() {
        const listingRef = collection(db, "users");
        const q = query(
          listingRef,
          where("userRef", "==", auth.currentUser.uid),
          orderBy("timestamp", "desc")
        );
        const querySnap = await getDocs(q);
        let data = [];
        querySnap.forEach((data) => {
          return data.push({
            posts: data.posts,
            followers: data.followers,
            following: data.uid.following
          });
        });
        console.log(data)
        setUserData(data);
        // setLoading(false);
      }
      //setCurrentUser(auth.currentUser.username)
      fetchUserData();
    }, [auth.currentUser.uid]);
  
    useEffect(() => {
        // console.log(params,"<------")
      updateProfile(params.email);
    //   updateProfile("achal@instabuzz.com");
    }, [params.email, user]);
  
    function updateFollowing(profile) {
      for (let follower of profile.followers) {
        if (follower.email === user) {
          setFollowing(true);
          return userData.following;
        }
      }
      setFollowing(false);
    }
  
    function updateProfile(email) {
      fetch("/getProfile?user=" + email)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setAlert({
              variant: "danger",
              message: "Profile does not exist.",
            });
            return;
          }
          fetch("/getPosts?user=" + email)
            .then((res) => res.json())
            .then((posts) => {
              setProfileData(data[0]);
              setPosts(posts);
              updateFollowing(data[0]);
              setOwner(user === data[0].email);
            });
        })
        .catch((err) => console.error(err));
    }
  
    function followClick() {
      if (owner) return;
  
      if (!following) {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user, id: profileData._id }),
        };
        fetch("/addFollower", requestOptions)
          .then((res) => res.json())
          .then((_data) => updateProfile(params.email));
      } else {
        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user, id: profileData._id }),
        };
        fetch("/removeFollower", requestOptions)
          .then((res) => res.json())
          .then((_data) => updateProfile(params.email));
      }
    }
  
    function hideEditCallback() {
      updateProfile(params.email);
      setEditing(false);
    }
  
    if (profileData == {}) return null;
  
    return (
      <div className="profile">
        <EditProfile
          user={user}
          show={editing}
          hideCallback={hideEditCallback}
          profileData={profileData}
          setAlert={setAlert}
        />
        <div className="profile-banner">
          
          {/*Change this to User Name*/}
        {user ? <h1>{user.displayName}</h1>: null}
        <br/>
        {/* <button type="button" className="btn btn-danger btn-lg" onClick={onLogout}>Log Out</button> */}
          <div className="profile-data">
            <img
              src={
                profileData.photo
                  ? profileData.photo.asset.url
                  : "https://via.placeholder.com/80"
              }
              id="profile-img"
            />
            <div className="vertical-data">
              <p>
                <strong>Posts</strong>
              </p>
              <h4>{posts ? posts.length : 0}</h4>
            </div>
            <div className="vertical-data">
              <p>
                <strong>Followers</strong>
              </p>
              <h4>{profileData.followers ? profileData.followers.length : 0}</h4>
            </div>
            <div className="vertical-data">
              <p>
                <strong>Following</strong>
              </p>
              <h4>{profileData.following ? profileData.following : 0}</h4>
            </div>
            <div className="follow-button">
              {user && !owner ? (
                <Button
                  variant={following ? "danger" : "success"}
                  onClick={followClick}
                >
                  {following ? "Unfollow" : "Follow"}
                </Button>
              ) : null}
              {user && owner ? (
                <Button variant="primary" onClick={() => setEditing(true)}>
                  Edit
                </Button>
              ) : null}
            </div>
          </div>
          <div className="profile-bio">
            <div className="profile-name">
              <strong>
                {(profileData.first_name ? profileData.first_name : "") +
                  " " +
                  (profileData.last_name ? profileData.last_name : "")}
              </strong>
            </div>
            <div className="profile-text">{profileData.bio}</div>
          </div>
        </div>
        <div className="break"></div>
        <div className="profile-posts-wrapper">
          <div className="profile-posts">
         
            {/* {posts && posts.length > 0
              ? posts.map((post, idx) => {
                  return <img src={post.photo.asset.url} key={idx} />;
                })
              : null} */}
          </div>
          <UserPosts/>
        </div>
      </div>
    );
}