const express = require('express');
const asyncHandler = require('express-async-handler');
const { Booking } = require('../../db/models')
// const { }

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll()
    return res.json({
      bookings
    })
  })
)

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const booking = await Booking.build({
      userId: req.body.userId,
      locationId: req.body.locationId,
      timespan: req.body.timespan,
    })
    await booking.save();
    return res.json({
      booking,
    });
  })
)

module.exports = router;