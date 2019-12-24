var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dropOffSchema = new Schema({

	title: {
		type: String,
		default: null
	},
	phoneno: {
		type: String,
		default: null
	},
	problem: {
		type: String,
		default: null
	},
	lati: {
		type: Number,
		default: null
	},
	longi: {
		type: Number,
		default: null
	},
	approval: {
		type: String,
		default: "approved"
	}
});

var cause = mongoose.model('drop-off', dropOffSchema);
module.exports = cause;