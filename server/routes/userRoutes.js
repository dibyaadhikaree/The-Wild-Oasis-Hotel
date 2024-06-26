const express = require("express");

const router = express.Router();

const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.get("/logout", authController.logout);

//getting current user

// Route for protecting and also providing user for the frontend
router.use(authController.protect);

router.patch("/updateUserData", authController.updateUserData);

router.patch("/updatePassword", authController.updatePassword);

//Only logged in user creates a user
router
  .route("/")
  .post(authController.createUser)
  .get(authController.getCurrentUser);

module.exports = router;
