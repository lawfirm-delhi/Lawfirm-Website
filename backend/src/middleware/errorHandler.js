const logger = require('../config/logger');
const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  
  logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  const message = (err.isOperational || statusCode < 500) ? err.message : 'Internal Server Error';
  
  if (err.name === 'ZodError') {
    return errorResponse(res, 400, 'Validation failed', err.errors);
  }

  errorResponse(res, statusCode, message, err.errors || []);
};

module.exports = errorHandler;
