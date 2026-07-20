const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateTokens = (user, accessTokenExpiry = '15m') => {
  const payload = { id: user.id, role: user.role };
  
  const accessToken = jwt.sign(payload, env.JWT_SECRET, { expiresIn: accessTokenExpiry });
  const refreshToken = jwt.sign(payload, env.REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.REFRESH_SECRET);
};

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
