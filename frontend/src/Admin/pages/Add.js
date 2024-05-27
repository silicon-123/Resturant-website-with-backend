// import React, { useState, useContext } from "react";
// import './Add.css';
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FoodContext } from "../components/FoodContext";
// import { useHistory } from "react-router-dom"; // Import useHistory hook

// const Add = () => {
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad"
//   });
//   const { fetchFoods } = useContext(FoodContext);
//   const history = useHistory(); // Initialize useHistory hook

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData(data => ({ ...data, [name]: value }));
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("price", Number(data.price));
//     formData.append("category", data.category);
//     formData.append("image", image);

//     try {
//       const response = await axios.post("http://localhost:5000/api/food/add", formData);
//       if (response.data.success) {
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Salad"
//         });
//         setImage(null);
//         toast.success(response.data.message);
//         fetchFoods(); // Fetch updated list of food items
//         history.push('/admin'); // Redirect to admin page after adding food item
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Failed to add food item");
//     }
//   };

//   return (
//     <div className="add">
//       <form className="flex-col" onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
//           </label>
//           <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
//         </div>
//         <div className="add-product-name flex-col">
//           <p>Product Name</p>
//           <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product Description</p>
//           <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product Category</p>
//             <select onChange={onChangeHandler} name="category" value={data.category} required>
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Desert">Desert</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">Cake</option>
//               <option value="Pure Veg">Pure Veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//               <option value="Non Veg">Non Veg</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//             <p>Product Price</p>
//             <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
//           </div>
//         </div>
//         <button type="submit" className="add-btn">ADD</button>
//       </form>
//     </div>
//   );
// };

// export default Add;
import React, { useState, useContext } from "react";
import './Add.css';
//import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
//import { FoodContext } from "../components/FoodContext";
import { Navigate } from "react-router-dom";

const Add = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
    //const { fetchFoods } = useContext(FoodContext);
    

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // const formData = new FormData();
        // formData.append("name", data.name);
        // formData.append("description", data.description);
        // formData.append("price", Number(data.price));
        // formData.append("category", data.category);
        // formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:5000/api/food/add");
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                toast.success(response.data.message);
                //fetchFoods(); // Fetch updated list of food items
                
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add food item");
        }
    };

    // Redirect to admin page if redirect state is true
    Navigate('/admin')
    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                {/* <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div> */}
                <div className="add-img-upload flex-col">
                    <p>Image URL</p>
                    <input
                        onChange={(e) => setImage(e.target.value)} // Assuming setImage is a function to set the image URL
                        type="text"
                        id="image-url"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category} required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Non Veg">Non Veg</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" required />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default Add;
