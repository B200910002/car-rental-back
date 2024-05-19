const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/middleware');
const { Vehicle, Image } = require('../models');

/* GET vehicle listing. */
router.get('/', async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll();
        for (let vehicle of vehicles) {
            const image = await Image.findOne({ where: { vehicle_id: vehicle.id } });
            vehicle.dataValues.image = image?.dataValues.image_url ?? null;
        }
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:vehicleId', async (req, res, next) => {
    try {
        const { vehicleId } = req.params;
        const vehicle = await Vehicle.findByPk(vehicleId);
        const image = await Image.findOne({ where: { vehicle_id: vehicle.id } });
        vehicle.dataValues.image = image?.dataValues.image_url ?? null;
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/my-vehicles', protect, async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll({ where: { owner_id: req.user.id } });
        for (let vehicle of vehicles) {
            const image = await Image.findOne({ where: { vehicle_id: vehicle.id } });
            vehicle.dataValues.image = image?.dataValues.image_url;
        }
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/available-vehicles', async (req, res, next) => {
    try {
        const vehicles = await Vehicle.findAll({ where: { available: true } });
        for (let vehicle of vehicles) {
            const image = await Image.findOne({ where: { vehicle_id: vehicle.id } });
            vehicle.dataValues.image = image?.dataValues.image_url;
        }
        res.status(200).json(vehicles);
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

/* PATCH vehicle listing. */
router.patch('/:vehicleId', protect, async (req, res, next) => {
    try {
        const { vehicleId } = req.params;
        const {
            plate_number,
            model,
            make,
            year,
            vehicle_price,
            price_per_day,
            kilometer_per_Day,
            price_exceed_per_kilometer,
            available
        } = req.body;

        const vehicle = await Vehicle.findByPk(vehicleId);
        if (vehicle) {
            await vehicle.update({
                plate_number,
                model,
                make,
                year,
                vehicle_price,
                price_per_day,
                kilometer_per_Day,
                price_exceed_per_kilometer,
                available
            });
            res.status(200).json(vehicle);
        } else {
            res.status(404).send({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;