import React from 'react';
import { Routes as Switch, Route as Routing, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from '../Components/login/login';
import Home from '../Components/Home';
import Signup from '../Components/Signup/Signup';
import Profile from '../Components/profile/profile';
import CreatePost from '../Components/CreatePost/CreatePost';
import EditProfile from '../Components/EditProfile/EditProfile';
import Search from '../Components/Search/Search';
import PrivateRoute from '../PrivateRoute';
import DisableIfAuth from '../DisableIfAuth';
import LostTrack from '../Components/LostTrack';
import UploadImage from '../Components/Uploadimage/UploadImage';
import UserPosts from '../Components/UserPosts/UserPosts';
import Follow from '../Components/Follow/Follow';
import PublicProfile from '../Components/PublicProfile/PublicProfile';
import Edit from '../Components/Edit/Edit';
import PostElement from '../Components/PostElement/PostElement';

const Routesr = () => {
	const [alert, setAlert] = useState(null);

	return (
		<>
			<Switch>
				<Routing exact path="/" element={<Home />} />

				<Routing path="/uploadimage" element={<PrivateRoute />}>
					<Routing exact path="/uploadimage" element={<UploadImage />} />
				</Routing>

				<Routing path="/profile" element={<PrivateRoute />}>
					<Routing exact path="/profile" element={<Profile />} />
				</Routing>

				<Routing path="/edit-profile" element={<PrivateRoute />}>
					<Routing exact path="/edit-profile" element={<Edit />} />
				</Routing>

				<Routing path="/createpost" element={<PrivateRoute />}>
					<Routing
						exact
						path="/createpost"
						element={<CreatePost setAlert={setAlert} />}
					/>
				</Routing>

				<Routing path="/follow" element={<PrivateRoute />}>
					<Routing exact path="/follow" element={<Follow />} />
				</Routing>
				{/* <Routing exact path="/CreatePost" element={<CreatePost />} /> */}

				<Routing path="/Search" element={<PrivateRoute />}>
					<Routing exact path="/Search" element={<Search />} />
				</Routing>

				<Routing path="/userPosts" element={<PrivateRoute />}>
					<Routing path="/userPosts" element={<UserPosts />} />
				</Routing>

				<Routing path="/user/:id" element={<PrivateRoute />}>
					<Routing path="/user/:id" element={<PublicProfile />} />
				</Routing>

				<Routing path="/post/:id" element={<PrivateRoute />}>
					<Routing path="/post/:id" element={<PostElement />} />
				</Routing>

				{/* Auth Routes */}
				<Routing path="/login" element={<DisableIfAuth />}>
					<Routing exact path="/login" element={<Login />} />
				</Routing>
				<Routing path="/signup" element={<DisableIfAuth />}>
					<Routing exact path="/signup" element={<Signup />} />
				</Routing>

				<Routing exact path="*" element={<LostTrack />} />
			</Switch>
		</>
	);
};
export default Routesr;
