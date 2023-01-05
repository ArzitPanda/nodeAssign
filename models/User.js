import mongoose from "mongoose";

const userschema = new mongoose.Schema({
        profileImg:{
            type: String,
        },
        userName:{
                type: String,
                required:true,
        },
        name:{
            type:String,
            required:true,
        },
        
        uid:{
            type: String,
        },
      
        videos:[{type:mongoose.Schema.Types.ObjectId,ref:"Video"}],
           
        


})
const User= mongoose.model("User",userschema);

export default User;