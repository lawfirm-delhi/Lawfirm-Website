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

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://127.0.0.1:5173'],
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
    const errorLogPath = path.join(__dirname, '../../logs/error.log');
    if (fs.existsSync(errorLogPath)) {
      const logs = fs.readFileSync(errorLogPath, 'utf8');
      res.send(`<pre>${logs}</pre>`);
    } else {
      res.send('No error log found');
    }
  } catch (err) {
    res.send(err.message);
  }
});

// API Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/consultations', require('./routes/consultation.routes'));
app.use('/api/v1/admin', require('./routes/admin.routes'));
app.use('/api/v1/documents', require('./routes/document.routes'));

// Central Error Handler
app.use(errorHandler);

module.exports = app;
