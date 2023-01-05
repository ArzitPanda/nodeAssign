import mongoose from "mongoose";


const noteSchema = mongoose.Schema({
    content:{
        type:String,
        
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video', 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Note = mongoose.model('Note', noteSchema);
export default Note;

