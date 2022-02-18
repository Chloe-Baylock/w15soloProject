const express = require('express');
const asyncHandler = require('express-async-handler');
// const { }

const router = express.Router();

// router.get(
//   '/',
//   asyncHandler(async (req, res) => {
//     // const bookings = await Booking.findAll()
//     return res.json({
//       bookings
//     })
//   })
// )

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newBooking = await Booking.build({
      userId: req.body.userId,
      locationId: req.body.locationId,
      timeSpan: req.body.timeSpan,
    })
    await newBooking.save();
    return {booking: req.body.booking};
  })
)

module.exports = router;