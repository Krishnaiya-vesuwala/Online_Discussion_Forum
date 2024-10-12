const mongoose = require('mongoose');

const CommentSchema=new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    text:{
        type:String,
    },
    time:{
        type:Date,
        default:Date.now()
    }
})

const Comment=mongoose.model('Comment',CommentSchema)

module.exports=Comment
