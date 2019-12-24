var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email:{type:String, default: null},
    title:{type:String, default: null},
    name:{type:String, default: null},
    
    rating:{type:Number, default: null},
});


module.exports = mongoose.model('CommentStar',schema);

//userid:{type:String, require:true} Is userid needed?