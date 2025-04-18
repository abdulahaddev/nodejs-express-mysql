const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      Status: 'Failed',
      StatusCode: 401,
      Message: 'No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        Status: 'Failed',
        StatusCode: 403,
        Message: 'Invalid or expired token',
      });
    }
    req.user = user; // Attach user to request
    next();
  });
};

const authorizeRole = (roleId) => (req, res, next) => {
  if (!req.user || !req.user.roles || !req.user.roles.includes(roleId)) {
    return res.status(403).json({
      Status: 'Failed',
      StatusCode: 403,
      Message: `Access denied. Role ID ${roleId} required.`,
    });
  }
  next();
};

module.exports = { authenticateToken, authorizeRole };