import { start } from 'directus';
import express from 'express';

const app = express();

// Middleware CORS manual (💥 este se ejecuta antes de Directus)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = [
    'https://cms-sahara.onrender.com',
    'http://localhost:5173', // si estás desarrollando en local
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, tipocambio');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // respuesta directa a preflight
  }

  next();
});

// Inicia Directus como middleware
start(app)
  .then(() => console.log('Directus iniciado con CORS manual'))
  .catch((err) => console.error('Error al iniciar Directus', err));