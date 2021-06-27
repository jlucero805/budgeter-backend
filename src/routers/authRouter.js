const authRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const VARS = require('../res/variables')
require('dotenv').config();

const User = require('../models/User');

authRouter.get('/', async (req, res) => {
	res.json({ works: "works!" });
});

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
			accountCreated: new Date(),
			options: {},
			types: VARS.DEFAULT_TYPES
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
	if (user === null) { return res.json({ error: "user does not exist!" }) };
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

// delete all users
authRouter.delete('/', async (req, res) => {
	try {
		await User.deleteMany({});
		res.sendStatus(200);
	} catch (e) {
		res.json({fail: 'fail'});
	}
});

module.exports = authRouter;