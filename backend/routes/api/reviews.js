const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const reviews = await Review.findAll();
  return res.json({
    reviews,
  })
}))

router.post('/new', asyncHandler(async (req, res) => {
  const review = await Review.build ({
    userId: req.body.userId,
    locationId: req.body.locationId,
    reviewContent: req.body.reviewContent,
  })
  await review.save();
  return res.json({
    review,
  })
}))

module.exports = router;