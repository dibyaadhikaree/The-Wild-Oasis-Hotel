const express = require("express");

const guestsController = require("../controllers/guestsController");

const router = express.Router();

router.route("/").post(guestsController.createGuest);
router.route("/:id").patch(guestsController.updateGuest);
router.route("/:email").get(guestsController.getUserFromEmail);

module.exports = router;
