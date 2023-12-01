import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import providerRoutes from './routes/provider.routes.js'

const app = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/', authRoutes);
app.use('/api/', productRoutes);
app.use('/api/', employeeRoutes);
app.use('/api/', providerRoutes);

export default app;
