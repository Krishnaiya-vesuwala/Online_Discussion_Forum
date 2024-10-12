const mongoose = require('mongoose');

const LikeSchema=new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    time:{
        type:Date,
        default:Date.now()
    }
})

const Like=mongoose.model('Like',LikeSchema)

module.exports=Like
