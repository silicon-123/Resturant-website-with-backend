// const mongoose = require('mongoose');
// const mongourl = 'mongodb+srv://priti:priti17@cluster0.n0gwmqh.mongodb.net/test';

// const mongoDB = async () => {
//     try {
//         // Connecting to the MongoDB database
//         await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Connected to MongoDB");

//         // Example of using a model to interact with the database
//         const foodCollection = mongoose.connection.db.collection("food_items");
        
//         // Fetching data from the collection
//         // const data = await 
//         foodCollection.find({}).toArray(function(err,data){
//             const foodCategory= mongoose.connection.db.collection("foodCategory");
//             foodCategory({}).toArray(function(err,catData){
//                 global.food_items=data;
//                 global.foodCategory= catData;
//             })
//         });
//         // global.food_items=data;
//         // console.log()
//     } catch (err) {
//         console.error("Failed to connect to MongoDB", err);
//     }
// }

// module.exports = mongoDB;
const mongoose = require('mongoose');
const mongourl = 'mongodb+srv://Tanisha:Tanisha12@cluster0.rjasmdm.mongodb.net/fooddel';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const foodCollection = db.collection("food_items");
        const foodCategoryCollection = db.collection("foodCategory");

        const food_items = await foodCollection.find({}).toArray();
        const foodCategory = await foodCategoryCollection.find({}).toArray();

        // Returning or storing these in a more appropriate location
        return { food_items, foodCategory };
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err; // Rethrow to ensure you handle this during startup or consider process exit.
    }
}

module.exports = mongoDB;
