const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const reviews = await Review.findAll();
  return res.json({reviews})
}))

router.post('/new', asyncHandler(async (req, res) => {
  const review = await Review.build({
    userId: req.body.userId,
    locationId: req.body.locationId,
    reviewContent: req.body.reviewContent,
  })
  await review.save();
  return res.json({
    review,
  })
}))

router.put('/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  console.log('got in here');
  const id = req.params.id;
  console.log('id is', id)
  const review = await Review.findByPk(+id);
  console.log('review is', review);
  review.userId = req.body.userId;
  review.locationId = req.body.locationId; 
  review.reviewContent = req.body.reviewContent;

  await review.save();
  return res.json({
    review,
  })
}))

module.exports = router;