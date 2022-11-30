const router = require('express').Router();
const authFunctions = require('../data/auth');

router.get('/getnames', async (req, res) => {
	
		return res.status(400).send({ name:'namefromserver'});
});

module.exports = router;