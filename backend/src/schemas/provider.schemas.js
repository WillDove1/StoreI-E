import { z } from 'zod';

export const providerSchema = z.object({
    productName: z.string({
        required_error: 'Nombre del producto requerido'
    }),
    price: z.number({
        required_error: 'Precio requerido'
    }),
    name: z.string({
        required_error: 'Nombre del proveedor requerido'
    }),
});
