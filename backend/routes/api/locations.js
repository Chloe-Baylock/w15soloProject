const express = require('express');
const asyncHandler = require('express-async-handler');
const { Location } = require('../../db/models');

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

module.exports = router;