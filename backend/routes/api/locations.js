const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Location, sequelize } = require('../../db/models');

const router = express.Router();


// load the locations
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const locations = await Location.findAll();
    return res.json({
      locations //key is locations value is the locations
    })
  })
)

router.post(
  '/',
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    let image = null
    if (req.file) image = await singlePublicFileUpload(req.file);
    const newLocation = await Location.build({
      locationName: req.body.locationName,
      description: req.body.description,
      location: req.body.location,
      userId: req.body.userId,
      image,
    })
    await newLocation.save();

    return res.json({
      newLocation
    })
  })
)

router.put(
  '/:id(\\d+)',
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const oldLocation = await Location.findByPk(id);
    
    oldLocation.locationName = req.body.locationName;
    oldLocation.description = req.body.description;
    oldLocation.location = req.body.location;
    oldLocation.userId = req.body.userId;
    
    let image = oldLocation.image;
    if (req.file) image = await singlePublicFileUpload(req.file);
    oldLocation.image = image;

    await oldLocation.save();

    return res.json({
      oldLocation,
      id
    })

  })
)

router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const location = await Location.findByPk(id);
    if (location) {
      location.destroy();
    }
    return res.json({
      id
    })
  })
)

module.exports = router;