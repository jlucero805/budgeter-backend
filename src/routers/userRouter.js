const userRouter = require('express').Router();
const User = require('../models/User');
const middleware = require('../utils/middleware');
const strings = require('../res/variables');
require('dotenv').config();

// get all data of a single user
userRouter.get('/', middleware.authToken, async (req, res) => {
	const user = await User.find({username: req.token.username});
	res.json(user);
});

// get types
userRouter.get('/types', middleware.authToken, async (req, res) => {
	const user = await User.findOne({username: req.token.username});
	res.json({types: user.types});
});

// add a type
userRouter.put('/types', middleware.authToken, async (req, res) => {
	const body = req.body;
	const user = await User.findOne({username: req.token.username});
	await User.findOneAndUpdate({username: req.token.username}, {$set: {types: user.types.concat(body.type)}});
	res.sendStatus(200);
});

// set types to default
userRouter.put('/types/default', middleware.authToken, async(req, res) => {
	await User.findOneAndUpdate({username: req.token.username}, {$set: {types: strings.DEFAULT_TYPES}});
	res.sendStatus(200);
});

module.exports = userRouter;