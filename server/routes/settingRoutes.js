const express = require("express");

const router = express.Router();

const settingsController = require("../controllers/settingsController");

router
  .route("/")
  .get(settingsController.getSettings)
  .post(settingsController.createSettings);

router.route("/:id").patch(settingsController.updateSettings);

module.exports = router;
