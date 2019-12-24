var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    firstName:{type:String, default: null},
    lastName:{type:String, default: null},
    email:{type:String, default: null},
    password:{type:String, default: null},
    securityQuestion:{type:String, default: null},
    securityAnswer:{type:String, default: null},
    type:{type:String, default: null},
    bio:{type:String, default: null},
    dob:{type:Date, default: null} ,
    phoneNo:{type:String, default: null},
    image:{type:String, default: null},
});


module.exports = mongoose.model('User',schema);

//userid:{type:String, require:true} Is userid needed?