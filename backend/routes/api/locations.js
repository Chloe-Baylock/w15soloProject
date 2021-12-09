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
    '/new',
    asyncHandler(async (req, res) => {
        console.log('req.body is', req.body);
        const newLocation = await Location.build({
            locationName: req.body.locationName,
            description: req.body.description,
            location: req.body.location,
            userId: 2
        })
        await newLocation.save();

        console.log(newLocation.toJSON());
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

        await sequelize.close();
    })
)

module.exports = router;