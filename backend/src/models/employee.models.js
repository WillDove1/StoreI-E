// employee.models.js
import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
name: {
    type: String,
    required: true,
},
salary: {
    type: Number,
    required: true,
},
age: {
    type: Number,
    required: true,
},
position: {
    type: String,
    required: true,
},
schedule: {
    type: String, // Agregar el campo "horario"
    required: true,
},
}, {
timestamps: true,
});

export default mongoose.model('Employee', employeeSchema);
