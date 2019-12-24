var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email:{type:String, default: null},
    fname:{type:String, default: null},
    lname:{type:String, default: null},
    reason:{type:String, default: null}
});

module.exports = mongoose.model('ReportP',schema);

//userid:{type:String, require:true} Is userid needed?