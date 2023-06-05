// =>import express
const express= require('express')

//import productController
const productController=require('../controllers/productController')

//import wishlistController 
const wishlistController=require('../controllers/wishlistController')

//import cartController 
const cartController=require('../controllers/cartController')

// =>using express, create an object for router class inorder to setup path 
const router = new express.Router()


//  =>resolving client requests 
    //api- getallproduct request
    router.get('/products/all-products',productController.getallproducts)

    //api for particular product
    router.get('/products/view-products/:id',productController.viewproduct)

    //api to add product to wishlist product 
    router.post('/wishlist/add-to-wishlist',wishlistController.addtowishlist)

    //api to get wishlist products
    router.get('/wishlist/get-wishlist',wishlistController.getwishlistitems)

    //api to remove wishlist item 
    router.delete('/wishlist/remove-wishlist-item/:id',wishlistController.removewishlistitems)

    //api to add to cart 
    router.post('/cart/add-to-cart',cartController.addtocart)


    //api to get cart products
    router.get('/cart/get-cart',cartController.getcartitems)

    //api to remove item from cart 
    router.delete('/cart/remove-item/:id',cartController.removecartitem)

    //api to increment cart item count 
    router.get('/cart/increment-count/:id',cartController.incrementcount)

    //api to decrement cart item count 
     router.get('/cart/decrement-count/:id',cartController.decrementcount)


//export router
module.exports=router