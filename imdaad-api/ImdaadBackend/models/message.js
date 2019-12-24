var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user:{type:String, default:'admin'},
    message:{type:String, default: null},
});

module.exports = mongoose.model('Message',schema);

//userid:{type:String, require:true} Is userid needed?