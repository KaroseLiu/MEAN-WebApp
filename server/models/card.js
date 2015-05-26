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

module.exports = mongoose.model('Card', CardSchema);
