var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email:{type:String, default: null},
    title:{type:String, default: null},
    name:{type:String, default: null},
    
    comment:{type:String, default: null},
});


module.exports = mongoose.model('Comments',schema);

//userid:{type:String, require:true} Is userid needed?