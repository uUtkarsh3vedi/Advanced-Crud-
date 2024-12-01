const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Authentication Error:', error.message);
    res.status(401).json({ message: "Unauthorized, token verification failed" });
  }
};

module.exports = authenticate;
