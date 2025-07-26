const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const { spawn } = require('child_process');

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