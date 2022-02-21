const express = require('express');
const asyncHandler = require('express-async-handler');
const {Location} = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async(req, res) => {
  const x = req.body.data;
  console.log('x is', x);
  const results = await Location.findAll();
  console.log('results is', results);
  return false;
}))

module.exports = router;