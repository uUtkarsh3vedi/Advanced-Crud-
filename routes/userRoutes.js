const express = require("express");
const router = express.Router();
const adminLimiter = require('../middlewares/rateMiddleware')
const managerLimiter = require('../middlewares/rateMiddleware')
const userLimiter = require('../middlewares/rateMiddleware')
const {
  SignUp,
  Login,
  EditUser,
  DeleteUser,
  Logout,
} = require("../controller/userController");
const authenticate = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");

router.post("/signUp", SignUp);
router.post("/login", Login);
router.get(
  "/admin-dashboard",
  authenticate,
  checkRole(["Admin"]),
   adminLimiter,
  (req, res) => {
    res.send("Welcome to dashboard");
  }
);
router.get(
  "/manager-tasks",
  authenticate,
  checkRole(["Manager"]),
  managerLimiter,
  (req, res) => {
    res.send("Welcome to manager task dashboard");
  }
);
router.get("/user-profile", authenticate, checkRole(["User"]), userLimiter, (req, res) => {
  res.send("Welcome to User dashboard");
});

router.put("/edit/:id", EditUser);
router.delete("/delete", DeleteUser);
router.post("/logout", authenticate, Logout);

module.exports = router;
