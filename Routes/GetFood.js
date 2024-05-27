const express = require('express');
const router = express.Router();
const Food = require('../models/Food'); // Assuming you have a Food model

// Get all food items
router.get('/food', async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
