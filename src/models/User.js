const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	accountCreated: Date,
	types: [],
	options: {}
});

const User = mongoose.model('user', userSchema);

module.exports = User;