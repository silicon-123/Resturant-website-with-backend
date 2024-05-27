// const express=require('express')
// const router=express.Router()

// router.post('/foodData',(req,res)=>{
//     try{
//         console.log(global.food_items)
//         res.send([global.food_items,global.foodCategory])
//     }catch(error){
//         console.error(error.message)
//         res.send("Server Error")
//     }
// })
// module.exports = router;
const express = require('express');
const router = express.Router();
const getMongoDBData = require('../db'); // Assuming db.js exports the mongoDB function.

router.post('/foodData', async (req, res) => {
    try {
        const { food_items, foodCategory } = await getMongoDBData();
        res.json({ food_items, foodCategory });
    } catch (error) {
        console.error("Server Error: ", error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
