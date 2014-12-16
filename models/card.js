var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
	name: String,
	type: String,
	status: String,
	description: String,
	deploymentState: String,
	appNode: String,
	libraries: Number
})

exports.Card = mongoose.model('Card', CardSchema);

