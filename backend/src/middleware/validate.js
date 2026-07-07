const { errorResponse } = require('../utils/response');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err.name === 'ZodError') {
      const issues = err.issues || err.errors || [];
      const errors = Array.isArray(issues) ? issues.map(e => ({
        field: Array.isArray(e?.path) ? e.path.join('.') : String(e?.path || ''),
        message: e?.message || 'Invalid input'
      })) : [{ field: 'unknown', message: 'Validation failed' }];
      return errorResponse(res, 400, 'Validation failed', errors);
    }
    next(err);
  }
};

module.exports = validate;
