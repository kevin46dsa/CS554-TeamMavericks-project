const apiRoutes = require('./authRoutes');
const dataRoutes = require("./dataRoutes")

const constructorMethod = (app) => {
	
	app.use('/auth', apiRoutes); 

	app.use('/data',dataRoutes);
	
	app.use('*', (req, res) => {

		res.status(404).json({ Welcome: 'Hello World this is Instabuzz API'});

	});
};

module.exports = constructorMethod;