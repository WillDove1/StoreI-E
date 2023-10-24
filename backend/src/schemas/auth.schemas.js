import {z} from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'
    })
        .email({
            required_error: 'Email inválido'
        }),
    password: z.string({
        required_error: 'Contraseña requerido'
    })
        .min(6, {
            message: 'El password debe tener al menos 6 caracteres'
        }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido'
    })
        .email({
            required_error: 'Email inválido'
        }),
        password: z.string({
            required_error: 'Contraseña requerida'
        })
        .min(6, {
            message: 'El password debe tener al menos 6 caracteres'
        }),
});
    