const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
	username: String,
	item: String,
	type: String,
	cost: Number,
	date: Date
});

purchaseSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
	}
});

const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = Purchase;