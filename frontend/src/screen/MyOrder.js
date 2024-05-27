import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myorderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row mb-3'>

                    {Object.keys(orderData).length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                < >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        {/* <span className='m-1'>{data}</span> */}
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </>
                                            )
                                        })

                                    )
                                }) :<div>No Previous Order</div>
                        )
                    }) : ""}
                </div>
                    

            </div>

            <Footer />
        </div>
    )
}

// import React, { useEffect, useState } from 'react';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import Razorpay from 'razorpay'

// function MyOrder() {
//     const [orderData, setOrderData] = useState({});

//     const fetchMyOrder = async () => {
//         console.log(localStorage.getItem('userEmail'));
//         await fetch("http://localhost:5000/api/myorderData", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: localStorage.getItem('userEmail')
//             })
//         }).then(async (res) => {
//             let response = await res.json();
//             await setOrderData(response);
//         });
//     };

//     useEffect(() => {
//         fetchMyOrder();
//     }, []);

//     const paymentHandler = async () => {
//         const amount = 500; // You can set the amount dynamically based on the order
//         const currency = 'INR';
//         const receiptId = '1234567890'; // You can generate a dynamic receipt ID

//         const response = await fetch('http://localhost:5000/order', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 amount,
//                 currency,
//                 receipt: receiptId
//             })
//         });

//         const order = await response.json();
//         console.log('order', order);

//         var option = {
//             key: "",
//             amount,
//             currency,
//             name: "Web Codder",
//             description: "Test Transaction",
//             image: "https://i.ibb.co/5Y3m33n/test.png",
//             order_id: order.id,
//             handler: async function (response) {
//                 const body = { ...response, }

//                 const validateResponse = await fetch('http://localhost:5000/validate', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(body)
//                 })

//                 const jsonResponse = await validateResponse.json();

//                 console.log('jsonResponse', jsonResponse);
//             },
//             prefill: {
//                 name: "Web Coder",
//                 email: "webcoder@example.com",
//                 contact: "9000000000",
//             },
//             notes: {
//                 address: "Razorpay Corporate Office",
//             },
//             theme: {
//                 color: "#3399cc",
//             },
//         }

//         var rzp1 = new Razorpay(option);
//         rzp1.on("payment.failed", function (response) {
//             alert(response.error.code);
//             alert(response.error.description);
//             alert(response.error.source);
//             alert(response.error.step);
//             alert(response.error.reason);
//             alert(response.error.metadata.order_id);
//             alert(response.error.metadata.payment_id);
//         })

//         rzp1.open();
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='container'>
//                 <div className='row mb-3'>
//                     {Object.keys(orderData).length !== 0 ? Array(orderData).map(data => {
//                         return (
//                             data.orderData ?
//                                 data.orderData.order_data.slice(0).reverse().map((item) => {
//                                     return (
//                                         item.map((arrayData) => {
//                                             return (
//                                                 <>
//                                                     {arrayData.Order_date ?
//                                                         <div className='m-auto mt-5'>
//                                                             {data = arrayData.Order_date}
//                                                             <hr />
//                                                         </div> :
//                                                         <div className='col-12 col-md-6 col-lg-3' key={arrayData.order_id}>
//                                                             <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
//                                                                 <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                                     <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                         <span className='m-1'>{arrayData.qty}</span>
//                                                                         <span className='m-1'>{arrayData.size}</span>
//                                                                         <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                             ₹{arrayData.price}/-
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     }
//                                                 </>
//                                             );
//                                         })
//                                     );
//                                 }) :
//                                 <div>No Previous Order</div>
//                         );
//                     }) :
//                     ""}
//                 </div>
//                 {/* Add the button here */}
//                 <div className="text-center">
//                     <button className="btn btn-primary" onClick={paymentHandler}>
//                         Proceed to Payment
//                     </button>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default MyOrder;

