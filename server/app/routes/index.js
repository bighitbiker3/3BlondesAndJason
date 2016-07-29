'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/me', require('./me'));
router.use('/address', require('./address'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
