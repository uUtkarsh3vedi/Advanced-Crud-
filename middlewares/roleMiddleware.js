const User = require('../models/userModel')

const checkRole = (roles) => {
    return (req, res, next) => {
      try {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
          return res.status(403).json({ msg: "Access forbidden: Insufficient permissions" });
        }
        next(); 
      } catch (error) {
        console.error('Role Middleware Error:', error.message);
        res.status(500).json({ msg: "Server error" });
      }
    };
  };
  
  module.exports = checkRole;
  