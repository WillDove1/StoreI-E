import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js';

const app = express();

app.use(cors({ credentials: true })); // Corrección: Elimina el uso duplicado de "app.use"
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', authRoutes);
app.use('/api/', productsRoutes);

export default app;
