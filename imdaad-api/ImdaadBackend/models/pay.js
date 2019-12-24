var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email:{type:String, default: null},
    name:{type:String, default: null},
    amount:{type:String, default: null},
});

module.exports = mongoose.model('Payment',schema);

//userid:{type:String, require:true} Is userid needed?