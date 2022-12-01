import { v4 as uuid } from 'uuid';
const initalState = [
	{
		id: uuid(),
		userWhoPosted: '',
		description: '',
		userWhoLiked: [],
		liked: false,
		image: '',
	},
];

let copyState = null;
let index = undefined;

const postReducer = (state = initalState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'CREATE_POST':
			console.log('payload', payload);
			return [
				...state,
				{
					id: uuid(),
					userWhoPosted: payload.userId,
					description: payload.description,
					userWhoLiked: [],
					liked: false,
				},
			];

		case 'DELETE_POST':
			copyState = [...state];
			index = copyState.findIndex((x) => x.id === payload.id);
			copyState.splice(index, 1);
			return [...copyState];

		default:
			return state;
	}
};

export default postReducer;
