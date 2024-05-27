import './App.css';

import Home from './screen/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
}from "react-router-dom";
import {FoodProvider} from "./Admin/components/FoodContext.js"
 
 import Login from './screen/Login';
 import Signup from './screen/Signup.js';
 import { AuthProvider } from './components/AuthContext.js';
import { CartProvider } from './components/ContextReducer';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
 import MyOrder from './screen/MyOrder.js';
import Payment from './screen/Payment.js';

import AdminHome from './Admin/components/Home.js';
import Signin from './Admin/components/Signin.js';
//import Login from './Admin/components/Login.js';
import ALogin from './Admin/components/Login.js';
import Add from './Admin/pages/Add.js'
function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <FoodProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/Signup' element={<Signup />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
           <Route exact path='/payment' element={<Payment />} />
           <Route exact path='/admin' element={<AdminHome />} />
           <Route exact path='/Signin' element={<Signin />} />
           <Route exact path='/Alogin' element={<ALogin/>} />
           <Route exact path='/Add' element={<Add/>} />
           </Routes>
        </div>
      </Router>
      </FoodProvider>
    </CartProvider>
    </AuthProvider>
    
  );
}

export default App;
