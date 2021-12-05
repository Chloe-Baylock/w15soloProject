const router = require('express').Router();

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

//GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

module.exports = router;