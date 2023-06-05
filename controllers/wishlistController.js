
//import wishlist collection 
const wishlists=require('../models/wishlistSchema')

//add product to wishlist logic 
exports.addtowishlist = async (req,res)=>{
    //get product details from request 
        //using destructuring 

        const {id,title,price,image} = req.body

        //logic 
        try{
            //check if product already in mongodb 
            const item=await wishlists.findOne({id})
            if(item){
                res.status(403).json("Item already exists in wishlist")
            }
            else{
                //add the item into the wishlist 
                const newProduct=new wishlists({id,title,price,image})

                //to store to mongodb 
                await newProduct.save()
                res.status(200).json("Product added to wishlist successfully")
            }
        }
        catch(error){
            res.status(401).json(error)

        }



}

        //get wishlist data to display on wishlist page 
        exports.getwishlistitems= async(req,res)=>{
            //logic 
            try{
                //get all wishlist items from mongodb 
                const allwishlistitems = await wishlists.find()
                res.status(200).json(allwishlistitems)
            }
            catch(error){
                res.status(401).json(error)
        
            }
        }





//remove wishlist item 
exports.removewishlistitems=async(req,res)=>{
    //get id from the request 
    const {id}=req.params

        //logic 
        try{
            // delete selected wishlist item from mongodb 
            const removewishlistitems = await wishlists.deleteOne({id})
            if(removewishlistitems){
                //get all wishlist item after removing that one item 
                const allwishlists = await wishlists.find() //remaining wishlist items being assigned to allwishlists
                res.status(200).json(allwishlists)


            }
            else{
                res.status(404).json("Item Not Found")
            }

        }
        catch(error){
            res.status(401).json(error)
    
        }

}