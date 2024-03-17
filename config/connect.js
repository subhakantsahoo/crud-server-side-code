const mongoose=require('mongoose');
async function myTask(){
    mongoose.set("strictQuery",false)
    mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(()=>console.log("connected"))
    .catch((err)=>{
        console.log(err);
    })
};
exports.connectMongo=myTask;