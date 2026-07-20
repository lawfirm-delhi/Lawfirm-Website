const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');
const { validateSignup, validateLogin } = require('../validators/auth.validator');

const signup = async (req, res) => {
  try {
    const { error, value } = validateSignup(req.body);
    if (error) {
      return errorResponse(res, 400, 'Validation failed', error.details);
    }

    const result = await authService.signup(value);
    
    return successResponse(res, 201, 'Account created successfully', result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return errorResponse(res, statusCode, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      return errorResponse(res, 400, 'Validation failed', error.details);
    }

    const result = await authService.login(value.email, value.password);
    
    return successResponse(res, 200, 'Logged in successfully', result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return errorResponse(res, statusCode, error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResponse(res, 400, 'Email is required');
    }

    const result = await authService.forgotPassword(email);
    return successResponse(res, 200, result.message);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  signup,
  login,
  forgotPassword
};
