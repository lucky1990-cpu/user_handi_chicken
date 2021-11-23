const mongoose =  require('mongoose')
 const BiryaniMahalUsers = mongoose.model('BiryaniMahalUserInfo',{
   Qty:{
       type:String
   },
   TotalAmount:{
       type:Number
   },
   FoodName:{
       type:String
   },
   PhoneNo:{
       type:Number
   },
    Name:{
      type:String
      
     },
     Address:{
         type:String
     },
     FoodId:{
         type:String
     },
     Status:{
        type:String
    },
    DateTime:{
        type:Date
    },
    
 })

 module.exports= BiryaniMahalUsers
