const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const locationsRouter = require('./locations');
const bookingsRouter = require('./bookings');
const reviewsRouter = require('./reviews');
const searchRouter = require('./search');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/locations', locationsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);
router.use('/search', searchRouter);

module.exports = router;