// employee.routes.js
import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { getEmployees, createEmployee, getEmployee, deleteEmployee, editEmployee } from '../controllers/employee.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { employeeSchema } from '../schemas/employee.schemas.js';

const router = Router();

router.get('/employees', authRequired, getEmployees);
router.post('/employees', authRequired, validateSchema(employeeSchema), createEmployee);
router.get('/employees/:id', authRequired, getEmployee);
router.delete('/employees/:id', authRequired, deleteEmployee);
router.put('/employees/:id', authRequired, editEmployee);

export default router
