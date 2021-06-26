const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
	username: String,
	item: String,
	type: String,
	cost: Number,
	date: Date
});

const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = Purchase;