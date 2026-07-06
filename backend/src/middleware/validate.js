const { errorResponse } = require('../utils/response');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    if (err.name === 'ZodError') {
      const issues = err.issues || err.errors || [];
      const errors = issues.map(e => ({ field: e.path.join('.'), message: e.message }));
      return errorResponse(res, 400, 'Validation failed', errors);
    }
    next(err);
  }
};

module.exports = validate;
