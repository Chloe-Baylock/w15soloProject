const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const locationsRouter = require('./locations');
const bookingsRouter = require('./bookings');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/bookings', bookingsRouter);

module.exports = router;