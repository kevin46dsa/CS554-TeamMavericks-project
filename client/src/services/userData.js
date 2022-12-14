import axios from 'axios';
import authHeader from './auth-header';
import config from '../Config/envVariables';
const API_URL = `${config.Server_url}/data`;
const Public_URL = `${config.Server_url}/public`;

//to get user information from server
const postUserReview = (body) => {
	return axios
		.post(API_URL + '/review', { body: body }, { headers: authHeader() })
		.then((response) => {
			return response.data;
		});
	//  "/review" is a route of the server
};

const getAllUser = () => {
	return axios
		.get(API_URL + '/review', { headers: authHeader() })
		.then((response) => {
			return response.data;
		}); //  "/review" is a route of the server
};

const getAllReview = () => {
	return axios.get(Public_URL + '/allReviews').then((response) => {
		return response.data;
	});
};

const reviewService = {
	getUserReview,
	postUserReview,
	getAllReview,
};
export default reviewService;