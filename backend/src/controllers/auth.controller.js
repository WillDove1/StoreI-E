import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'
export const register = async (req,res) =>{
    try{
        const userFound = await User.findOne({email});
        if(userFound)
            return res.status(400).json({message: ["El email ya esta en uso"]})
        const passwordHash = await bcryptjs.hash(password,10);
        const {username, email, password} = req.body;
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})
        res.cookie('token', token,{
            sameSite: 'none',
            secure: true
        });
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email:userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updateAt
        });
    }catch(error){
        console.log(error);
    }
}


export const login= async(req,res)=>{
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(400).json({message: ['Usuario no encontrado']})
        }
        //Comparamos el password que envio el usuario con el de la base de datos
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if(!isMatch){
            return res.status(400).json({message: ['Password no coincide']})
        }
        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token, {
            sameSite: 'none',
            secure: true
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updateAt: userFound.updateAt
        });
    }catch(error){
        console.log(error);
    }
}

export const logout = (req, res) =>{
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) =>{
    const userFound = await User.findById(req.user.id);

    if(!userFound)
        return res.status(400).json({message: ["Usuario no encontrado"]})
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    });
}