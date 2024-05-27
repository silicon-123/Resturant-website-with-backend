import React, { useEffect, useState } from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Home.css'; // Make sure to include the necessary CSS

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [editFood, setEditFood] = useState(null);
  const [newFoodData, setNewFoodData] = useState({ name: '', description: '', price: '', image: '' });

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food'); // Your endpoint to fetch food items
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching food items: ", error);
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/food/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }
      setFoods(foods.filter(food => food._id !== id));
    } catch (error) {
      console.error("Error deleting food item: ", error);
    }
  };

  const handleEditClick = (food) => {
    setEditFood(food);
    setNewFoodData({
      name: food.name,
      description: food.description,
      price: food.price,
      image: food.image,
    });
  };

  const handleCancelEdit = () => {
    setEditFood(null);
    setNewFoodData({ name: '', description: '', price: '', image: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFoodData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async () => {
    if (!editFood) return;

    try {
      const response = await fetch(`http://localhost:5000/api/food/${editFood._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFoodData),
      });

      if (!response.ok) {
        throw new Error('Failed to update food item');
      }

      const updatedFood = await response.json();
      setFoods(foods.map(food => (food._id === updatedFood._id ? updatedFood : food)));
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating food item: ", error);
    }
  };

  return (
    <div className="admin-home">
      <Navbar />
      <div className="admin-content">
        <Sidebar />
        <div className="main-content">
          <div className="home">
            <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
            <div className="food-list">
              {foods.map(food => (
                <div key={food._id} className="food-item">
                  {editFood && editFood._id === food._id ? (
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={newFoodData.name}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="description"
                        value={newFoodData.description}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="price"
                        value={newFoodData.price}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="image"
                        value={newFoodData.image}
                        onChange={handleInputChange}
                      />
                      <button onClick={handleSubmitEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <img src={food.image} alt={food.name} />
                      <h3>{food.name}</h3>
                      <p>{food.description}</p>
                      <p>${food.price}</p>
                      <button onClick={() => handleEditClick(food)}>Update</button>
                      <button onClick={() => handleDelete(food._id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
