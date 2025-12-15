const mongoose=require("mongoose");

const sessionSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    role:{type:String,required:True},
    experience:{type:String,required:True},
    topicToFocus:{type:String,required:True},
    description:String,
    questions:[{type:mongoose.Schema.Types.ObjectId,ref:"Question"}],
},
    {timestamps:true});

    module.exports=mongoose.model("Session",sessionSchema);