const route = require('express').Router()
const fs = require('fs');

const { Router } = require('express')
// const control =  require('../controller/control')
// const upload = require('../Middleware/multer')
const UserOrderDetails  = require('../MongoDB/UserOrderDetails')
const FoodDetails = require('../MongoDB/FoodDetail')



route.get('/',(req,res)=>{
    res.render('home')

})

route.get('/AllFoodItems',(req,res)=>{
    res.render('AllFoodItems')

})

route.get('/OrderFoodItem',(req,res)=>{
    res.render('UserFoodDetail')

})

route.get('/OrderedFood',(req,res)=>{
res.render('OrderedFood')
})

route.get('/EditFoodItemFetchData',async(req,res)=>{
    try{
        const EditItem = await FoodDetails.find({_id:req.query._id})
        res.json(EditItem)
    }
   catch(e){
       console.log(e)

   }

})

// Ordered Food serch using phone no

route.get('/SearchedByPhoneNo',async(req,res)=>{
    console.log(req.query)
    try{
        const ordereFood = await UserOrderDetails.find({PhoneNo:9990716623})
        res.json(ordereFood)
    }
   catch(e){
       console.log(e)

   }

})


route.get('/FoodItems',async(req,res)=>{
    try{
        const FoodItems = await FoodDetails.find({})
        res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
   
        res.json(FoodItems)
    }
   catch(e){

   }

})

route.post('/FoodOrder',async(req,res)=>{
    console.log(req.body)
     const FoodOrderDetail = {
        FoodId: req.body.FoodId,
        FoodName:req.body.FoodName,
        Qty:req.body.Qty,
        TotalAmount:req.body.TotalAmount,
        Name:req.body.Name,
        PhoneNo:req.body.PhoneNo,
        Address:req.body.Address
     }
    // console.log('update food items:'+ req.url)
    // console.log(req.body)
       const foodUserOrder=   await new UserOrderDetails(FoodOrderDetail)
    try{
      foodUserOrder.save();
      
      res.status(200).json({data:'order is submited succesfully'})
      
     }
     catch(e){
       console.log(e)
     }


})

module.exports=  route



