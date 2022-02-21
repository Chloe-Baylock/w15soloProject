const express = require('express');
const asyncHandler = require('express-async-handler');
const { Location } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const searchVal = req.body.data.toUpperCase();
  const locations = await Location.findAll();
  const results = locations.filter(location => {
    return location.location.toUpperCase().includes(searchVal) ||
    location.locationName.toUpperCase().includes(searchVal);
  });
  return res.json({
    results
  });
}))

module.exports = router;