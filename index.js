


//import express 
const express = require("express")
//import cors
const cors= require("cors")

//import .env - automatically loads .env files into our project
const dotenv = require('dotenv')
dotenv.config()

//import connection.js
require('./db/connection')

//import router
const router = require('./routes/router')

//import logic.js
const logic=require('./services/logic')



//create a server using express 
const server=express()

//use cors in server app
server.use(cors({
    origin:'http://localhost:4200'
}))

//parse json data to js in server app
server.use(express.json())

server.use(router)

//to resolve client request 
// server.get("/",(req,res)=>{
//     res.send('Get Method')
// })

//to store port number 
const PORT = 5000

//setup port for the server 
server.listen(5000,()=>{
    console.log('Listening on port '+PORT);
})


//register
server.post('/register',(req,res)=>{
    console.log('Inside the register api call');
    console.log(req.body);
    logic.register(req.body.name,req.body.gender,req.body.age,req.body.height,req.body.weight,req.body.email,req.body.password).then((result)=>{
    res.status(result.statusCode).json(result);
    // res.status(200).json({message:'Request Received'})

    })
    // res.send('Register Request Received')
})


//login api call 
server.post('/login',(req,res)=>{
    console.log('Inside the login api call');
    console.log(req.body);
    logic.login(req.body.email,req.body.password).then((result)=>{
        res.status(result.statusCode).json(result);

    })
}
)
//----------------------------------------------------------------------------------------------



