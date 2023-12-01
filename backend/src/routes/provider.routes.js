import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getProviders,
    createProvider,
    getProvider,
    deleteProvider,
    editProvider
} from '../controllers/provider.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { providerSchema } from '../schemas/provider.schemas.js';

const router = Router();

router.get('/providers', authRequired, getProviders);
router.post('/providers', authRequired, validateSchema(providerSchema), createProvider);
router.get('/providers/:id', authRequired, getProvider);
router.delete('/providers/:id', authRequired, deleteProvider);
router.put('/providers/:id', authRequired, editProvider);

export default router;
