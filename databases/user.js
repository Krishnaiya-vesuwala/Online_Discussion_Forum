const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    registration_Time:{
        type:Date,
        default:Date.now
    }
});

UserSchema.pre('save',async function(next){

    const u1=this;

    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    const hasedPassword=await bcrypt.hash(this.password,salt);
     u1.password=hasedPassword;
    next();

});

UserSchema.methods.comparePassword=async function(candidatepass){
    try{
        const isMatch=await bcrypt.compare(candidatepass,this.password);
        return isMatch;

    }catch(error){
        console.log(error)
    }
}

const User=mongoose.model('User',UserSchema);

module.exports=User;