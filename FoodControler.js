// foodController.js

// Import any models or modules needed
const Food = require('./models/Food'); // Assuming you have a Food model

// Controller function for adding food items
const addFoodItem = async (req, res) => {
  try {
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
};

module.exports = { addFoodItem };
