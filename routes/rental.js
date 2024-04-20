const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/middleware');
const { Rental, Payment } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const rentals = await Rental.findAll();
        res.status(200).json(rentals);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.patch('/payment', async (req, res, next) => {
    try {
        const { rental_id, pay_amount, paid_amount, estimated_amount } = req.body;
        const rentals = await Payment.create(
            {
                pay_amount: pay_amount,
                paid_amount: paid_amount,
                estimated_amount: estimated_amount,
                rental_id: rental_id,
            }
        );
        res.status(200).json(rentals);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;
