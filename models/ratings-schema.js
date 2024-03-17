const mongoose=require('mongoose');
const  ratings=require('../routes');
const RatingsSchema=mongoose.Schema({
    
   // movie:{type:String},
    rating:{type:Number},
    movie:{type:mongoose.Types.ObjectId,ref:"movies"},
    user:{type:mongoose.Types.ObjectId,ref:"users"},

});
module.exports=mongoose.model('rating',RatingsSchema);


