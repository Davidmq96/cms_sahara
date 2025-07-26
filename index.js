import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

// Necesario para obtener __dirname en ES modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(cors({
  origin: true,
  credentials: true,
}));

app.use('/api', createProxyMiddleware({
  target: 'https://cms-sahara.onrender.com',
  changeOrigin: true,
  pathRewrite: { '^/api': '' },
}));



// Lanzar Directus como proceso hijo
const directusProcess = spawn('npx', ['directus', 'start'], { stdio: 'inherit' });

directusProcess.on('close', (code) => {
  console.log(`Directus proceso terminó con código ${code}`);
});