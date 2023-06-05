//db connection with nodejs 
 
//import mongoose 
const mongoose=require("mongoose");



//create a model & schema for data into the database 
const User=mongoose.model('User',{
    name:String,
    gender:String,
    age:Number,
    height:Number,
    weight:Number,
    email:String,
    password:String,
})


//export the collection 
module.exports={
    User
}

//----------------------------------------------------------------------------------------------


