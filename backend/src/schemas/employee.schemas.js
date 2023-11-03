// employee.schemas.js
import { z } from 'zod';

export const employeeSchema = z.object({
    name: z.string({
    required_error: 'Nombre de empleado requerido',
    }),
    salary: z.number({
    required_error: 'Salario es requerido',
    }),
    age: z.number({
    required_error: 'Edad es requerida',
    }),
    position: z.string({
    required_error: 'Puesto requerido',
    }),
  schedule: z.string({ // Agregar el campo "horario"
    required_error: 'Horario requerido',
    }),
});
