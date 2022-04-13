const express = require('express');
const asyncHandler = require('express-async-handler');
const { Location } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  console.log('upper route')
  const locations = await Location.findAll();
  // let results = Array.from(locations);
  return res.json({
    results:locations
  });
}))

router.get('/:searchVal([\\s\\S]*)', asyncHandler(async (req, res) => {
  const searchVal = req.params.searchVal;
  const locations = await Location.findAll();
  results = Array.from(locations);
  console.log('SEARCHVAL is', searchVal)
  if (searchVal.length) {
    results = locations.filter(location => {
      return location.location.toUpperCase().includes(searchVal.toUpperCase()) ||
      location.locationName.toUpperCase().includes(searchVal.toUpperCase());
    });
  }
  return res.json({
    results
  });
}))

module.exports = router;