const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Food = require('../models/Food');

// Route for adding food items
router.post('/food/add', [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('price').isNumeric(),
  body('category').notEmpty(),
  body('image').notEmpty() // Assuming image is required
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Extract food item data from request body
    const { name, description, price, category, image } = req.body;

    // Create a new food item
    const newFoodItem = new Food({
      name,
      description,
      price,
      category,
      image
    });

    // Save the new food item to the database
    await newFoodItem.save();

    // Send success response
    res.status(200).json({ success: true, message: 'Food item added successfully' });
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).json({ success: false, message: 'Failed to add food item' });
  }
});

module.exports = router;
