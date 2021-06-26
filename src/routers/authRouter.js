const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User');

// create new user
authRouter.post('/user', async (req, res) => {
	const body = req.body;
	const user = await User.find({ username: body.username });
	if (user.length >= 1) { return res.json({ error: "user already exists" }).end(); }
	try {
		const hashedPass = await bcrypt.hash(body.password, 10);
		const newUser = new User({
			username: body.username,
			password: hashedPass,
			accountCreated: new Date()
		});
		await newUser.save();
		res.status(201).json({ success: "created new user" });
	} catch (e) {
		res.status(500);
	}
});

// authenticate user and return token
authRouter.post('/login', async (req, res) => {
	const body = req.body;
	const user = await User.findOne({ username: body.username });
	if (user === null) { return res.json({ error: "user already exists!" }) };
	try {
		if (await bcrypt.compare(body.password, user.password)) {
			const jwtUser = { username: body.username, password: body.password }
			const token = jwt.sign(jwtUser, process.env.ACCESS_TOKEN_SECRET);
			return res.status(201).json({ token: token })
		} else {
			return res.json({ error: "login failed" });
		}
	}
	catch (e) {
		res.json({ error: "login failed" });
	}
});

module.exports = authRouter;