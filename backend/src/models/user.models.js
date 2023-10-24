import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type: String,
        requeired: true,
        trim: true
    },
    email:{
        type: String,
        requeried: true,
        trim: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps: true
})


export default mongoose.model('User', userSchema);