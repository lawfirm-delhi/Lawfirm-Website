const logger = require('../config/logger');
const { errorResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
  const statusCode = err.status || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';
  
  if (err.name === 'ZodError') {
    return errorResponse(res, 400, 'Validation failed', err.errors);
  }

  errorResponse(res, statusCode, message, err.errors || []);
};

module.exports = errorHandler;
