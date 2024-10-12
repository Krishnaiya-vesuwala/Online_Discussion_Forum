const express=require('express');
const router=express.Router();
const User=require('../databases/user');
const {jwtAuth,genAuth}=require('../jwt')

// registration routes
router.post('/register',async(req,res)=>{

    try{
        const userData=req.body;
        if(!userData){
            return res.status(500).json({message:'Error in Data'});
        }
        const user=new User(userData);
        const response=await user.save();
        // token creation

        const payload={
            id:response.id,
            password:response.password
        }
        const token=genAuth(payload);
        console.log(token);
        return res.status(200).json({response:response,token});

    }catch(error){
        console.log(error);
    }
})
router.post('/login',async(req,res)=>{
    try{
        const {Email,password}=req.body;
        
        const user=await User.findOne({Email:Email})
        console.log(user.password)
        if(!user){
            return res.status(500).json({message:'Invalid email'})
        }
        if(!(await user.comparePassword(password))){
            return res.status(202).json({message:'Invalid password'})
        }
        const payload={
            id:user.id,
            password:user.password
        }
        const token=genAuth(payload);
        console.log(token);
        return res.status(200).json(token);

    }catch(error){
        console.log(error)
    }
})
module.exports=router;