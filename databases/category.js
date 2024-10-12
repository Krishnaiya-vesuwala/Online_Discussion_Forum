const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    cname:{
        type:String,
        required:true
    }
})

const Categories=mongoose.model('Categories',categorySchema)

module.exports=Categories