

//import db.js
const db=require('./db')


//logic for register - async func 
const register=(name,gender,age,height,weight,email,password)=>{
console.log('Works Inside the Register');

//email in db?
//sss
return db.User.findOne({email}).then((response)=>{
    //console.log(response);
    if(response){
        return{
            statusCode:401,
            message:'Email already registered'
        }
    }
    else{
        //new object for registration 
        const newUser=new db.User ({
            name,
            gender,
            age,
            height,
            weight,
            email,
            password
        })
        //save to db 
        newUser.save()
        //send response to client 
        return{
            statusCode:200,
            message:'Successfully Registered'
        }
    }
})
}

//logic for login - async 
const login=(email,password)=>{
    console.log('inside the login function');
    return db.User.findOne({email,password}).then((result)=>{
        if(result){//email present in db
            return{
                statusCode:200,
                message:'Successfully Logged In'
            }
        }
        else{
            //email not in db
            return{
                statusCode:401,
                message:'Invalid Data'
            }

        }
    })
}


//export 
module.exports={
    register,
    login
}

//----------------------------------------------------------------------------------------------
