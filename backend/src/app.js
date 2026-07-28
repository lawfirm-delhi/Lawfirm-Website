const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const { successResponse } = require('./utils/response');

const app = express();

// Trust proxy for express-rate-limit behind Render reverse proxy
app.set('trust proxy', 1);

// Security Middlewares
app.use(helmet());
const origins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()) 
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || origins.includes(origin) || origins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Performance Middlewares
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Health Check
app.get('/health', (req, res) => {
  successResponse(res, 200, 'Server is healthy', { timestamp: new Date().toISOString() });
});

// TEMPORARY LOG EXPOSURE FOR DEBUGGING
const fs = require('fs');
app.get('/api/v1/logs', (req, res) => {
  try {
    let output = '';
    const errLogPath = path.join(__dirname, '../logs/error.log');
    const combLogPath = path.join(__dirname, '../logs/combined.log');
    
    if (fs.existsSync(errLogPath)) output += `<h3>error.log</h3><pre>${fs.readFileSync(errLogPath, 'utf8')}</pre>`;
    if (fs.existsSync(combLogPath)) output += `<h3>combined.log</h3><pre>${fs.readFileSync(combLogPath, 'utf8')}</pre>`;
    
    res.send(output || 'No logs found');
  } catch (err) {
    res.send(err.message);
  }
});

// API Routes
app.get('/api/v1/health', async (req, res) => {
  try {
    const { db } = require('./config/database');
    await db.raw('SELECT 1');
    res.status(200).json({ status: 'ok', message: 'Server and Database are awake' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database unreachable' });
  }
});

app.use('/api/v1/consultations', require('./routes/consultation.routes'));
app.use('/api/v1/admin', require('./routes/admin.routes'));
app.use('/api/v1/documents', require('./routes/document.routes'));
app.use('/api/v1/auth', require('./routes/auth.routes'));

// Central Error Handler
app.use(errorHandler);

module.exports = app;
