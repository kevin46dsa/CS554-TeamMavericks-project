const addTrainer = (name) => ({
	type: 'CREATE_TRAINER',
	payload: {
		name: name,
	},
});

const deleteTrainer = (id) => ({
	type: 'DELETE_TRAINER',
	payload: { id: id },
});

const selectTrainer = (id) => ({
	type: 'SELECT_TRAINER',
	payload: { id: id },
});

const selectPokemon = (trainerID, pokeId, pokeName) => ({
	type: 'CATCH_POKEMON',
	payload: {
		pokeId: pokeId,
		trainerID: trainerID,
		pokeName: pokeName,
	},
});

const unselectPokemon = (pokeId, trainerID) => ({
	type: 'UNCATCH_POKEMON',
	payload: {
		pokeId: pokeId,
		trainerID: trainerID,
	},
});

module.exports = {
	addTrainer,
	deleteTrainer,
	selectTrainer,
	selectPokemon,
	unselectPokemon,
};
