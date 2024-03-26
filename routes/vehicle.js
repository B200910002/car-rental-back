const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/middleware');
const { Vehicle } = require('../models');

/* GET vehicle listing. */
router.get('/', async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/my-vehicles', protect, async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll({ where: { owner_id: req.user.id } });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/available-vehicles', async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findAll({ where: { available: true } });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/* POST vehicle listing. */
router.post('/', protect, async (req, res, next) => {
    try {
        const { plate_number, model, make, year, vehicle_price } = req.body;
        const vehicle = await Vehicle.create({ plate_number, model, make, year, vehicle_price, owner_id: req.user.id });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/* POST vehicle listing. */
router.post('/', protect, async (req, res, next) => {
    try {
        const { plate_number, model, make, year, vehicle_price } = req.body;
        const vehicle = await Vehicle.create({ plate_number, model, make, year, vehicle_price, owner_id: req.user.id });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;