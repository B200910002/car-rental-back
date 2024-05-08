const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/middleware');
const { Booking, Rental, Vehicle } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/by-status/:status', async (req, res, next) => {
    try {
        const { status } = req.params;
        const bookings = await Booking.findAll({ where: { status: status } });
        res.status(200).json(bookings);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/', protect, async (req, res, next) => {
    try {
        const { start_at, end_at, vehicle_id } = req.body;
        const vehicle = await Vehicle.findByPk(vehicle_id);
        const booking = await Booking.create(
            {
                start_at: start_at,
                end_at: end_at,
                renter_id: req.user.id,
                vehicle_id: vehicle.dataValues.id
            }
        );
        res.status(200).json(booking);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.patch('/', async (req, res, next) => {
    try {
        const { booking_id, status, rental_rate, insurance_charge, fuel_charge } = req.body;
        if (status == 'CONFIRMED') {
            const rental = await Rental.create(
                {
                    rental_rate: rental_rate,
                    insurance_charge: insurance_charge,
                    fuel_charge: fuel_charge,
                    booking_id: booking_id
                }
            );
        }
        const booking = await Booking.update({ status: status }, { where: { booking_id: booking_id } });
        res.status(200).json(booking);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
