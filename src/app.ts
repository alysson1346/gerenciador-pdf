import express from 'express';
import pdfRoutes from './routes';
import "dotenv/config";


export const app = express();


// Middleware para JSON com limite aumentado
app.use(express.json({ limit: '200mb' }));

// Rotas
app.use('/api', pdfRoutes);
