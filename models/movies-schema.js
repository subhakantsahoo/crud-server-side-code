const mongoose=require('mongoose');
const  movies=require('../routes');
const MoviesSchema=mongoose.Schema({
    movie:{type:String},
    image:{type:String}
});
module.exports=mongoose.model('movies',MoviesSchema);