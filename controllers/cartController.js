//import cart collection
const carts = require('../models/cartSchema');

//add to cart 
exports.addtocart = async(req,res)=>{
   //get product details from request 
    const {id,title,price,image,quantity} = req.body ;

    //logic 
    try{
       //check if item already in cart and incre/decrement quantity 
       const product = await  carts.findOne({id});
       if(product){
           //product is in cart , increment product quantity 
           product.quantity+=1 ;
           //update grand total in mongo db 
           product.grandtotal = product.price * product.quantity ;
           //to save changes in mongodb 
           product.save() ; 
           //send response to the client 
           res.status(200).json("Product added to the cart") ; 


       }
       else{
           //product not already in the cart 
           //add product to the cart 
           const newProduct = new carts({id,title,price,image,quantity,grandtotal:price}) ; 
           //save new product 
           await newProduct.save() ;
           //send response to the client
           res.status(200).json("Product added to the cart") ; 

       }
    }
    catch(error){
       res.status(401).json(error);
    }
}


//get cart data to display on cart page 
exports.getcartitems= async(req,res)=>{
   //logic 
   try{
       //get all cart items from mongodb 
       const allcartitems = await carts.find()
       res.status(200).json(allcartitems)
   }
   catch(error){
       res.status(401).json(error)

   }
}

//delete item from cart 
exports.removecartitem = async(req,res)=>{
   //get product id from request params 
   const {id}=req.params ;
   try{
       //remove an item from cart 
       const removeproduct = await carts.deleteOne({id})
       if(removeproduct.deletedCount!=0){
           //get remaining products 
           const remainingproducts = await carts.find() ;
           res.status(200).json(remainingproducts)
       }
       else{
           res.status(404).json("Item Not Found")
       }
   }
   catch(error){
       res.status(401).json(error)

   }
}


//increment cart item quantity 
exports.incrementcount= async (req,res)=>{
   //get product id from request params
   const{id}=req.params 
   try{
       //check if product in cart 
       const product = await carts.findOne({id})
       if(product){
           //increment product count and grandtotal 
           product.quantity+=1 
           product.grandtotal=product.price*product.quantity
           //savechanges to mongodb
           await product.save()
           //increment get all the products from the cart after updating in particular cart item 
           const allitems=await carts.find()
           res.status(200).json(allitems)
       }
       else{
           res.status(404).json("Item not fount")
       }
   }
   catch(error){
       res.status(404).json("error")

   }
}

//decrement cart item quantity 
exports.decrementcount= async (req,res)=>{
   //get product id from request params
   const{id}=req.params 
   try{
       //check if product in cart 
       const product = await carts.findOne({id})
       if(product){
           //decrement product count and grandtotal 
           product.quantity-=1 
           if(product.quantity==0){
               //remove 
               await carts.deleteOne({id})
               const allitems=await carts.find()
               res.status(200).json(allitems)
           }
           else{
               product.grandtotal=product.price*product.quantity
               //savechanges to mongodb
               await product.save()
               //decrement get all the products from the cart after updating in particular cart item 
               const allitems=await carts.find()
               res.status(200).json(allitems)
           }

       }
       else{
           res.status(404).json("Item not fount")
       }
   }
   catch(error){
       res.status(404).json("error")

   }
}