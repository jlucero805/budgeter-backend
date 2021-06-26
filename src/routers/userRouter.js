const userRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const VARS = require('../res/variables');
const User = require('../models/User');
require('dotenv').config();


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

userRouter.get('/', authToken, async (req, res) => {
	// finish getting single account
})

module.exports = userRouter;