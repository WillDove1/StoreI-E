import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        const url = 'mongodb+srv://WillDove:Pascal123@willdove.cw1uku3.mongodb.net/?retryWrites=true&w=majority'
        //await mongoose.connect('mongodb://127.0.0.1/sistema');
        await mongoose.connect(url);
        console.log('Base de datos conectada');
    }catch(error){
        console.log(error);
    }
}