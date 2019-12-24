var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email:{type:String, default: null},
    fname:{type:String, default: null},
    
    gender:{type:String, default: null},
    type:{type:String, default: null},
    material:{type:String, default: null},
    quantity:{type:String, default: null},
    size:{type:String, default: null},
    condition:{type:String, default: null},
    address:{type:String, default: null},
    lat:{type:Number, default: null},
    long:{type:Number, default: null},
    comments:{type:String, default: null}
});


module.exports = mongoose.model('Clothes',schema);

//userid:{type:String, require:true} Is userid needed?