import React from 'react';
import './Header.css';
import {
	NavLink,
	useNavigate,
} from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { getAuth } from 'firebase/auth';


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
const Logout = (props) => {
	let auth = props.auth
	let navigate = props.navigate
	function onLogout() {
	
		auth.signOut().then(()=>{
		alert("User Signed out")
		navigate("/login");
		}).catch(()=>{
		alert("Error with signning out")
		})
		
	  }
	
	return (
		<button
			className="text__button"
			onClick={onLogout}
			
		>
			Logout
		</button>
	);
};

const Header = () => {
	const { user, isLoading } = useUser();
	console.log(user);
	const auth = getAuth();
    const navigate = useNavigate();
	
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
						{!user ? <Login /> : <Logout auth={auth} navigate={navigate}/>}
						<NavLink className="navlink" to="/profile">
							<button className="text__button">Profile</button>
						</NavLink>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Header;
