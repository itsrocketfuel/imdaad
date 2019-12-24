var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var causeSchema = new Schema({

	title: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: false,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	requirements: {
		type: String,
		required: true,
	},
	documents: {
		type: String,
		required: false,
	}
});

var cause = mongoose.model('cause', causeSchema);
module.exports = cause;