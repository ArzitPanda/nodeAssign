import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
        tag:{
            type: String,
        },
    title: {
        type: String,

    },
    
  likes: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }],
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
      
        
           
        


})
export const Videos= mongoose.model("Video",VideoSchema);