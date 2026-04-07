const mongoose=require('mongoose');
async function myTask(){
    mongoose.set("strictQuery",false)
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydatabase';
    mongoose.connect(mongoUri)
    .then(()=>console.log("connected"))
    .catch((err)=>{
        console.log(err);
    })
};
exports.connectMongo=myTask;
