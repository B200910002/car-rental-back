var express = require('express');
var router = express.Router();

const userRouter = require('./user');
const vehicleRouter = require('./vehicle');
const imageRouter = require('./image');
const bookingRouter = require('./booking');
const rentalRouter = require('./rental');

router.use('/user', userRouter);
router.use('/vehicle', vehicleRouter);
router.use('/image', imageRouter);
router.use('/booking', bookingRouter);
router.use('/rental', rentalRouter);

module.exports = router;
