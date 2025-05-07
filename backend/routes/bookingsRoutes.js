const express = require("express");
const Booking = require("../models/bookingModel")
const { newBooking, cancelBooking, getAllBookings } = require("../controller/bookingController");
const router = express.Router();

router.route("/").post(newBooking).get(getAllBookings)

router.post("/cancel",cancelBooking)

module.exports = router;

