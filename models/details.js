const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    place:{type:String,required:true},
    message:{type:String,required:true},
    image:{type:String,required:true},
    contact:{type:Number,required:true},
    address:{type:String,required:true},
    creator:{type:mongoose.Types.ObjectId,required:true,ref:"User"}
})

module.exports =mongoose.model("details",detailsSchema);