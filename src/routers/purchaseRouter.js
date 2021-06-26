const purchaseRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Purchase = require('../models/Purchase');

const authToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token === null) return res.sendStatus(401);
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authenticatedToken) => {
		if (err) return res.sendStatus(403);
		req.token = authenticatedToken;
		next(); 
	});
}

// get all purchases for a single user 
purchaseRouter.get('/', authToken, async (req, res) => {
	try {
		const allPurchases = await Purchase.find({ username: req.token.username });
		res.json(allPurchases.reverse());
	} catch (e) {
		res.status(400);
	}
}); 


module.exports = purchaseRouter;