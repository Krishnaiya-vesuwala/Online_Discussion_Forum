const express=require('express');
const router=express.Router();
const {jwtAuth,genAuth}=require('../jwt');
const Categories = require('../databases/category');

router.post('/category',jwtAuth,async (req,res)=>{

    try{
        const data=req.body;
        const userId=req.user.id
    
        const userData=new Categories(data)
        userData.user_id=userId
        const response=await userData.save()
    
        return res.status(200).json({response})

    }catch(error){
        console.log(error)
    }
})
router.get('/show/:id',jwtAuth,async (req,res)=>{
    try{
      const id=req.params.id
      const data=await Categories.findById(id)

      return res.status(200).json({data:data})

    }catch(error){
        console.log(error)
    }
})

module.exports=router