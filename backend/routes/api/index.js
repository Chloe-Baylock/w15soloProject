const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const asyncHandler = require('express-async-handler')
const { User, Location } = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const location = await Location.findAll();
        return res.json({
            location
        })
    })
)


module.exports = router;