const apiRoutes = require('./authRoutes');

const constructorMethod = (app) => {
	
	app.use('/auth', apiRoutes); 
	
	app.use('*', (req, res) => {
		res.status(404).json({ Welcome: 'Hello Welcome to instaBuzz'});
	});
};

module.exports = constructorMethod;