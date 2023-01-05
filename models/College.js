import mongoose from "mongoose";

const collegeSchema = mongoose.Schema({
    name: String,
    location: String,
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const College = mongoose.model('College', collegeSchema);
export default College;