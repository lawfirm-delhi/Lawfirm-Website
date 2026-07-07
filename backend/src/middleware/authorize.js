const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next({ 
        status: 403, 
        message: 'Forbidden: You do not have permission to access this resource', 
        isOperational: true 
      });
    }
    next();
  };
};

module.exports = authorize;
