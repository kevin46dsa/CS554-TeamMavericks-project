import React from 'react';
import './Header.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from 'react-router-dom';
import { useState } from 'react';

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
		<NavLink className="navlink" to="/logout">
			<button className="text__button">Logout</button>
		</NavLink>
	);
};

const Header = () => {
	const [login, setLogin] = useState(true);
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
						{login ? <Login /> : <Logout />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
