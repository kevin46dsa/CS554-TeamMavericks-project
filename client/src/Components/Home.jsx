import React from 'react';
import { useState, useEffect } from 'react';
import useUser from '../hooks/useUser';
import axios from 'axios';

const Home = () => {
	const { user, isLoading } = useUser();
	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:4000/action/getnames')
			.then((response) => {
				setData(response);
			})
			.catch(() => {
				console.log('Error with use effect');
			});
	}, []);

	return (
		<div>{user ? <h1>Home user logged in {data}</h1> : <h1>No user</h1>}</div>
	);
};

export default Home;
