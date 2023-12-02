import bcryptjs from 'bcryptjs';
import User from '../models/user.models.js';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';;

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const  userFound = await User.findOne({email});
        if (userFound)
            return res.status(400)
                        .json({message: ['El email ya esta en uso']})
        
        const passwordHash = await bcryptjs.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
            
        });
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el registro de usuario' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({ message: ['Usuario no encontrado'] });
        }
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
            return res.status(400).json({ message: ['Contraseña no coincide'] });
        }
        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
            
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.sendStatus(200);
};

export const profile = async (req, res)=>{
    const userFound = await User.findById(req.user.id);

    if(!userFound)
        return res.status(400).json({message: ["User not found"]})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
}

export const verifyToken = async (req, res)=>{
    const {token} = req.cookies;

    if(!token)
        return res.status(4001).json({message: ["No autorizado"]});

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if(err)
        return res.status(401).json({message: ["No autorizado"]});

        const userFound = await User.findById(user.id);
        if(!userFound)
            return res.status(401).json({message: ["No autorizado"]});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    })
}