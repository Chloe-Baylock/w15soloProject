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
    asyncHandler(async (req, res) => {
        const newLocation = await Location.build({
            locationName: req.body.locationName,
            description: req.body.description,
            location: req.body.location,
            userId: req.body.userId
        })
        await newLocation.save();

        return res.json({
            newLocation
        })
    })
)

router.put(
    '/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const oldLocation = await Location.findByPk(id);

        oldLocation.locationName = req.body.locationName;
        oldLocation.description = req.body.description;
        oldLocation.location = req.body.location;
        oldLocation.userId = req.body.userId;

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