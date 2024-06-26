const express = require("express");

const router = express.Router();

const bookingsController = require("../controllers/bookingsController");

router
  .route("/")
  .get(bookingsController.getAllBookings)
  .post(bookingsController.createBooking);

router
  .route("/:id")
  .get(bookingsController.getBooking)
  .patch(bookingsController.updateBooking)
  .delete(bookingsController.deleteBooking);

router.route("/user/:id").get(bookingsController.getBookingByUserId);

module.exports = router;
