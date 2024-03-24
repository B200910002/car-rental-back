var express = require('express');
var router = express.Router();

const userRouter = require('./user');
const vehicleRouter = require('./vehicle');

router.use('/user', userRouter);
router.use('/vehicle', vehicleRouter);

module.exports = router;
