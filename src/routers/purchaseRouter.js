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

// add new purchase
purchaseRouter.post('/', authToken, async (req, res) => {
	const body = req.body;
	try {
		const newPurchase = new Purchase({
			username: req.token.username,
			item: body.item,
			type: body.type,
			cost: body.cost,
			date: new Date()
		});
		await newPurchase.save();
	} catch (e) {
		res.status(500);
	}
});

// delete all purchases
purchaseRouter.delete('/', async (req, res) => {
	try {
		await Purchase.deleteMany({});
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(400);
	}
});

//delete single purchase
purchaseRouter.delete('/:id', authToken, async (req, res) => {
	try {
		const params = req.params;
		await Purchase.deleteMany({ id: params.id });
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(400);
	}
});

module.exports = purchaseRouter;