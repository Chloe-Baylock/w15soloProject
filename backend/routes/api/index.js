const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const locationsRouter = require('./locations')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/locations', locationsRouter);


module.exports = router;