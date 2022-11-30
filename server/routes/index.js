const authRoutes = require('./auth');
const actionRoutes = require('./action');

const constructorMethod = (app) => {
	
	app.use('/auth', authRoutes); 
	app.use('/action', actionRoutes)
	app.use('*', (req, res) => {
		res.status(404).json({ Welcome: 'Hello World'});
	});
};

module.exports = constructorMethod;