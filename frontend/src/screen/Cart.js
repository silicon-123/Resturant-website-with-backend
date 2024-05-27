// import React from 'react'
// // import Delete from '@material-ui/icons/Delete'
// import { useCart, useDispatchCart } from '../components/ContextReducer';
// export default function Cart() {
//   let data = useCart();
//   let dispatch = useDispatchCart();
//   if (data.length === 0) {
//     return (
//       <div>
//         <div className='m-5 w-100 text-center fs-3' style={{ color: 'white' }}>The Cart is Empty!</div>
//       </div>
//     )
//   }
//   // const handleRemove = (index)=>{
//   //   console.log(index)
//   //   dispatch({type:"REMOVE",index:index})
//   // }

//   const handleCheckOut = async () => {
//     let userEmail = localStorage.getItem("userEmail");
//     // console.log(data,localStorage.getItem("userEmail"),new Date())
//     let response = await fetch("http://localhost:5000/api/orderData", {
//       // credentials: 'include',
//       // Origin:"http://localhost:3000/login",
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         order_data: data,
//         email: userEmail,
//         order_date: new Date().toLocaleString()
//       })
//     });
//     console.log("JSON RESPONSE:::::", response.status)
//     if (response.status === 200) {
//       alert('Order placed successfully!');
//       dispatch({ type: "DROP" })
//     }
//   }

//   let totalPrice = data.reduce((total, food) => total + food.price, 0)
//   return (
//     <div>

//       {console.log(data)}
//       <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
//         <table className='table table-hover '>
//           <thead className=' text-success fs-4'>
//             <tr>
//               <th scope='col' >#</th>
//               <th scope='col' >Name</th>
//               <th scope='col' >Quantity</th>
//               <th scope='col' >Option</th>
//               <th scope='col' >Amount</th>
//               <th scope='col' ></th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((food, index) => (
//               <tr>
//                 <th scope='row' >{index + 1}</th>
//                 <td className='table' style={{ color: 'white' }}>{food.name}</td>
// <td className='table' style={{ color: 'white' }}>{food.qty}</td>
// <td className='table' style={{ color: 'white' }}>{food.size}</td>
// <td className='table' style={{ color: 'white' }}>{food.price}</td>

//                 <td ><button type="button" className="btn p-0" style={{ color: 'white' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} >Delete</button> </td></tr>
//             ))}
//           </tbody>
//         </table>
//         <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
//         <div>
//           <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
//         </div>
//       </div>



//     </div>
//   )
// }

import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleCheckOut = async () => {
        if (!token) {
            alert('Please log in to place an order');
            navigate('/login');
            return;
        }

        let userEmail = localStorage.getItem('userEmail');
        let response = await fetch('http://localhost:5000/api/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toLocaleString(),
            }),
        });

        if (response.status === 200) {
            alert('Order placed successfully!');
            dispatch({ type: 'DROP' });
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td className='table' style={{ color: 'white' }}>{food.name}</td>
                                <td className='table' style={{ color: 'white' }}>{food.qty}</td>
                                <td className='table' style={{ color: 'white' }}>{food.size}</td>
                                <td className='table' style={{ color: 'white' }}>{food.price}</td>
                                <td><button type='button' className='btn p-0' style={{ color: 'white' }} onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    );
}

