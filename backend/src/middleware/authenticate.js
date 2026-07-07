const { verifyAccessToken } = require('../utils/jwt');
const authRepo = require('../repositories/auth.repository');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next({ status: 401, message: 'Authentication required', isOperational: true });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next({ status: 401, message: 'Authentication token missing', isOperational: true });
    }

    const decoded = verifyAccessToken(token);
    
    // We optionally verify the user still exists in the DB (for extra security)
    // but decoded.id is the primary truth for now
    const user = await authRepo.getUserById(decoded.id);
    if (!user) {
      return next({ status: 401, message: 'User no longer exists', isOperational: true });
    }

    // Attach user payload to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
      company: user.company,
      mobile: user.mobile
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next({ status: 401, message: 'Token expired', isOperational: true });
    }
    return next({ status: 401, message: 'Invalid token', isOperational: true });
  }
};

module.exports = authenticate;
