// 1 import mongoose
const mongoose=require('mongoose')

// 2
const db=process.env.DATABASE;

// 3
mongoose.connect(db,{
    //topology
    useUnifiedTopology:true,
    useNewUrlParser: true 
}).then(()=>{
    console.log('Database is connected');
}).catch((err)=>{
    console.log(err);
})
