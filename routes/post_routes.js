const express=require('express');
const router=express.Router();
const Post=require('../databases/post');
const Categories=require('../databases/category');
const {jwtAuth,genAuth}=require('../jwt');
const { default: mongoose } = require('mongoose');
const slug=require('slug')


router.post('/post/:category_id',jwtAuth,async(req,res)=>{

    try{
        const userId=req.user.id
        const category_id=req.params.category_id
        const cat_data=await Categories.findById(category_id)
       
        if(!cat_data){
            return res.status(500).json({message:'Add category'})
        }
        const data=req.body
        const userData=new Post(data)
        userData.user_id=userId
        userData.categoryId=category_id
        const response=await userData.save()
    
        return res.status(200).json({response:response})
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: 'Error creating post' });
    }
   
})
router.get('/search/:title',jwtAuth,async(req,res)=>{

    const s_title=req.params.title
    const slug_title=slug(s_title)

    const data=await Post.findOne({slug:slug_title})
    if(!data){
        return res.status(500).json({message:'Data is not there'})
    }
    return res.status(200).json({data:data.content})
})
module.exports=router