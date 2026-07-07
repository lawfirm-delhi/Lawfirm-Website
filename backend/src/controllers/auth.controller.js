const authService = require('../services/auth.service');
const { successResponse } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      successResponse(res, 201, 'User registered successfully', user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'] || '';

      const data = await authService.login(email, password, ip, userAgent);
      
      res.cookie('refreshToken', data.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      successResponse(res, 200, 'Login successful', {
        user: data.user,
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken
      });
    } catch (err) {
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      // req.user is injected by the authenticate middleware
      successResponse(res, 200, 'User retrieved successfully', req.user);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body || {};
      const token = refreshToken || req.cookies?.refreshToken;
      
      const newTokens = await authService.refresh(token);
      
      res.cookie('refreshToken', newTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      successResponse(res, 200, 'Token refreshed successfully', newTokens);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const token = refreshToken || req.cookies?.refreshToken;
      
      await authService.logout(token);
      res.clearCookie('refreshToken');
      
      successResponse(res, 200, 'Logged out successfully');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
