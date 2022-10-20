const mongoose=require('mongoose');

exports.connectMongoose=()=>{
    mongoose
        .connect("mongodb://0.0.0.0:27017/Assignment1")
        .then((e)=>console.log(`Database connected at ${e.connection.host}`))
        .catch((e)=>console.log(e));
};

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    mobile:{
        type:String,
        required: true,
    },
    date_of_birth:{
        type:String,
        required: true,
    },
    work_experience:{
        type:String,
        required: true,
    },
    resume_title:{
        type:String,
        required: true,
    },
    current_location:{
        type:String,
        required: true,
    },
    postal_address:{
        type:String,
        required: true,
    },
    current_employer:{
        type:String,
        required: true,
    },
    current_designation:{
        type:String,
        required: true,
    },

});

exports.User=mongoose.model("Storedata1",userschema);