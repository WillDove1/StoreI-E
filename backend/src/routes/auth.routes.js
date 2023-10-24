import {Router} from 'express';
import {
    register,
    login,
    logout,
    profile
} from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schemas.js';
const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.get('/logout',logout);
router.get('/profile', authRequired, profile);

export default router;