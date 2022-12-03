const apiRoutes = require('./authRoutes');

const constructorMethod = (app) => {
	
	app.use('/auth', apiRoutes); 
	
	app.use('*', (req, res) => {
		res.status(404).json({ Welcome: 'Hello World this is Marvel CS554_API Lab 2'});
	});
};

module.exports = constructorMethod;