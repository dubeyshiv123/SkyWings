const express = require("express");
const { BookingController } = require("../../controllers");
const { BookingRequestMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  BookingRequestMiddlewares.validateBookingRequest,
  BookingController.createBooking
);

router.get("/", BookingController.getBookings);

router.post("/payments", BookingController.makePayment);
router.get("/searchFlights", BookingController.getAllFlights);

module.exports = router;
