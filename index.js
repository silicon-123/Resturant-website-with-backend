// const express = require('express')
// const Razorpay=require("razorpay")
// const cors=require("cors")
// const crypto=require("crypto")
// require('dotenv').config();
// const app = express()

// app.use(express.urlencoded({extended:false}))
// app.use(cors())
// const port = 5000
// const mongoDB=require('./db');
// const { log } = require('console');
// mongoDB();
// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// })
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


// app.use(bodyParser.json());

// let admins = [];
// let items = [];
// let orders = [];

// // Register endpoint
// app.post('/api/admin/register', (req, res) => {
//   const { username, password } = req.body;
//   const newAdmin = { id: admins.length + 1, username, password };
//   admins.push(newAdmin);
//   res.json({ message: 'Admin registered successfully' });
// });

// // Login endpoint
// app.post('/api/admin/login', (req, res) => {
//   const { username, password } = req.body;
//   const admin = admins.find(admin => admin.username === username && admin.password === password);
//   if (admin) {
//     res.json({ message: 'Login successful', admin });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// // Add item endpoint
// app.post('/api/items', (req, res) => {
//   const { name, id, price } = req.body;
//   const newItem = { id, name, price };
//   items.push(newItem);
//   res.json({ message: 'Item added successfully', item: newItem });
// });

// // Get items endpoint
// app.get('/api/items', (req, res) => {
//   res.json(items);
// });

// // Get orders endpoint (mocked data for now)
// app.get('/api/orders', (req, res) => {
//   res.json(orders);
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// app.use(express.json())
// app.use('/api',require("./Routes/CreateUser"))
// app.use('/api',require("./Routes/DisplayData"))
// app.use('/api',require("./Routes/OrderData"))
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const bodyParser = require('body-parser'); // Import bodyParser

require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
//const AdminRoutes = require('./AdminRoutes');
app.use(bodyParser.json()); // Use bodyParser.json() middleware
app.use(express.json()); // Use express.json() middleware
app.use(express.static('public')); // Serve static files from the public directory


// Define route for adding food items

const port = process.env.PORT || 5000; // Use port from environment variable or default to 5000

// MongoDB setup
const mongoDB = require('./db');
mongoDB();

// CORS setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.put('/food/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = data.find(item => item.id === parseInt(id));
  if (item) {
    item.name = name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Delete item
app.delete('/food/:id', (req, res) => {
  const { id } = req.params;
  data = data.filter(item => item.id !== parseInt(id));
  res.send('Item deleted');
});




// Additional routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/AdminRoutes"));
app.use('/api', require("./Routes/AddFood"));
app.use('/api', require("./Routes/GetFood"));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
