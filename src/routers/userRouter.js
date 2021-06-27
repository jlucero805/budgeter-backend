const userRouter = require('express').Router();
const User = require('../models/User');
const middleware = require('../utils/middleware');
require('dotenv').config();

// get all data of a single user
userRouter.get('/', middleware.authToken, async (req, res) => {
	const user = await User.find({username: req.token.username});
	res.json(user);
})

// get types
userRouter.get('/types', middleware.authToken, async (req, res) => {
	const user = await User.findOne({username: req.token.username});
	res.json({types: user.types});
})

module.exports = userRouter;