var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    semail:{type:String, default: null},
    title:{type:String, default: null},
    name:{type:String, default: null},
    reason:{type:String, default: null}
});

module.exports = mongoose.model('ReportC',schema);

//userid:{type:String, require:true} Is userid needed?