import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

    const  userFound = await User.findOne({email});
    if (userFound)
        return res.status(400).json({message: ['El email ya esta en uso']})
    
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token, {
        sameSite: 'none',
        secure: true
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
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
        return res.status(400).json({ message: ['Contraseña no coincide'] });
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie('token', token, {
        sameSite: 'none',
        secure: true
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
    res.cookie('token', '', {
    expires: new Date(0),
    });
    res.sendStatus(200);
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