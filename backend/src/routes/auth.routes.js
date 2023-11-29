import { Router } from 'express';
import { login, 
    register, 
    logout, 
    profile,
    verifyToken
} from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';
const router = Router();

router.get('/verify', verifyToken);

// Ruta para el registro de usuario (POST)
router.post('/register',validateSchema(registerSchema) ,register);

// Ruta para el inicio de sesión de usuario (POST)
router.post('/login',validateSchema(loginSchema) ,login);

// Ruta para el cierre de sesión de usuario (POST)
router.post('/logout', logout);

// Ruta protegida para obtener el perfil del usuario (GET)
router.get('/profile', authRequired, profile);

export default router;
