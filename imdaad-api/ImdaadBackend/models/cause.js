var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    pic:{type:String, default:null},
    email:{type:String, default: null},
    fname:{type:String, default: null},
    title:{type:String, default: null},
    name:{type:String, default: null},
    age:{type:String, default: null},
    phoneno:{type:String, default: null},
    problem:{type:String, default:null},
    req:{type:String, default: null},
    documents:{type:String, default: null}
});


module.exports = mongoose.model('Cause',schema);

//userid:{type:String, require:true} Is userid needed?