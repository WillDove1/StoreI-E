import mongoose from "mongoose";

const employeesSchema = mongoose.Schema({
    name:{
        type: String,
        requeired: true,
        trim: true
    },
    edad:{
        type: String,
        requeried: true,
        trim: true
    },
    puesto:{
        type:String,
        required:true,
        trim: true
    },
    horario:{
        type: String,
        required: true,
        trim: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
})


export default mongoose.model('Employees', userSchema);