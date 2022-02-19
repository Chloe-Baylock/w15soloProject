const express = require('express');
const asyncHandler = require('express-async-handler');
const { Booking } = require('../../db/models')

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll();
    return res.json({
      bookings
    })
  })
)

router.post(
  '/new',
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

router.put(
  '/:id(\\d+)/edit',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    
    booking.userId = req.body.userId;
    booking.locationId = req.body.locationId;
    booking.timespan = req.body.timespan;

    await booking.save();

    return res.json({
      booking,
    })
  })
)

router.delete(
  '/:id(\\d+)/delete',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const booking = await Booking.findByPk(id);
    if (booking) booking.destroy();
    return res.json({
      id,
    })
  })
)

module.exports = router;