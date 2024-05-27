const mongoose = require('mongoose');

// Define the schema for the Food model
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String, // Assuming you store image URLs
    required: true
  }
});

// Create the Food model using the schema
const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
