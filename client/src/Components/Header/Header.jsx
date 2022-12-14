import React from 'react';
import './Header.css';
import {
	BrowserRouter as Router,
	NavLink,
	useNavigate,
} from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { getAuth } from 'firebase/auth';
const OnLogout = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	auth
		.signOut()
		.then(() => {
			alert('User Signed out');
			navigate('/login');
		})
		.catch(() => {
			alert('Error with signning out');
		});
};

const Login = () => {
	return (
		<>
			<NavLink className="navlink" to="/login">
				<button className="primary__button">Log in</button>
			</NavLink>
			<NavLink className="navlink" to="/signup">
				<button className="text__button">Sign up</button>
			</NavLink>
		</>
	);
};
const Logout = () => {
	return (
		<button
			className="text__button"
			onClick={() => {
				OnLogout();
			}}
		>
			Logout
		</button>
	);
};

const Header = () => {
	const { user, isLoading } = useUser();

	return (
		<div className="app">
			<div className="app__header">
				<div className="app__headerWrapper">
					<NavLink to="/">
						<img
							src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
							alt="Instagram original logo"
						/>
					</NavLink>

					<div className="app__headerButtons">
						{!user ? <Login /> : <Logout />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
