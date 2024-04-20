const express = require('express');
const router = express.Router();
const { protect, uploadImage } = require('../middleware/middleware');
const { Image } = require('../models');

router.get('/:vehicleId', async (req, res, next) => {
    try {
        const { vehicleId } = req.params;
        const images = await Image.findAll({ where: { vehicle_id: vehicleId } });
        res.status(200).json(images);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

// upload image
router.post('/upload-image', protect, uploadImage);

module.exports = router;
