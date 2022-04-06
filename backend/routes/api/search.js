const express = require('express');
const asyncHandler = require('express-async-handler');
const { Location } = require('../../db/models');

const router = express.Router();

router.get('/:searchVal(\\w+)', asyncHandler(async (req, res) => {
  const searchVal = req.params.searchVal;
  const locations = await Location.findAll();
  const results = locations.filter(location => {
    return location.location.toUpperCase().includes(searchVal.toUpperCase()) ||
    location.locationName.toUpperCase().includes(searchVal.toUpperCase());
  });
  return res.json({
    results
  });
}))

module.exports = router;