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
            userId: 2
        })
        await newLocation.save();

        console.log(newLocation.toJSON());
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
   
        return res.json({
            newLocation
        })
    })
)

router.delete(
    '/:id(\\d+)',
    asyncHandler(async (req, res) => {
        const id = req.path.split('/')[1];
        const location = await Location.findByPk(+id);
        await location.destroy();
        console.log('destroyed');
        return id;
    })
)

module.exports = router;