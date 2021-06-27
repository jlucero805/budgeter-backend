const purchaseRouter = require('express').Router();
const middleware = require('../utils/middleware');

const Purchase = require('../models/Purchase');

// get all purchases for a single user 
purchaseRouter.get('/', middleware.authToken, async (req, res) => {
	try {
		const allPurchases = await Purchase.find({ username: req.token.username });
		res.json(allPurchases.reverse());
	} catch (e) {
		res.status(400);
	}
}); 

// add new purchase
purchaseRouter.post('/', middleware.authToken, async (req, res) => {
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
		res.json(newPurchase);
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
purchaseRouter.delete('/:id', middleware.authToken, async (req, res) => {
	try {
		const id = req.params.id;
		await Purchase.deleteOne({ _id: id }, (err) => console.log(err));
		res.sendStatus(200);
	} catch (e) {
		res.sendStatus(400);
	}
});

module.exports = purchaseRouter;