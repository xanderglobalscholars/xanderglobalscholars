const jwt = require('jsonwebtoken');

/**
 * Middleware to protect routes and ensure the user is authenticated.
 * Validates the presence of a token and decodes it to extract user information.
 */
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to the request object
      req.user = decoded;
      
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * Middleware to authorize access based on user roles.
 * Verifies if the user's role is allowed to access a specific route.
 * @param {...string} roles - The roles that are allowed to access the route.
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
