// // // FoodContext.js
 import React, { createContext, useState, useEffect } from 'react';
 import axios from 'axios';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/food');
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching food items", error);
      // Log detailed error information
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, fetchFoods }}>
      {children}
    </FoodContext.Provider>
  );
};

  