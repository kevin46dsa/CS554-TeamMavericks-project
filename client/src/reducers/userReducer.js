import { v4 as uuid } from 'uuid';
const initalState = [
	{
		id: uuid(),
		name: 'Deep Manek',
		email: 'dpmanek@gmail.com',
		post: [],
		followers: [],
		following: [],
		description: '',
		profilePicture: '',
	},
];

let copyState = null;
let index = undefined;

const userReducer = (state = initalState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'CREATE_USER':
			console.log('payload', payload);
			//logic to update the state in firebase
			return [
				...state,
				{
					id: uuid(),
					name: payload.name,
					email: payload.email,
					post: [],
					followers: [],
					following: [],
					description: '',
				},
			];

		case 'DELETE_USER':
			copyState = [...state];
			index = copyState.findIndex((x) => x.id === payload.id);
			copyState.splice(index, 1);
			return [...copyState];

		default:
			return state;
	}
};

export default userReducer;
