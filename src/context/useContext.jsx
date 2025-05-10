import axios from 'axios'
import React ,{ useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosInstance from '../Api/axiosInstance'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
 
 export const userContext=createContext()
function Context({children}) {
  const id =localStorage.getItem("id")
    
    const[cart,setCart]=useState([])
    const [isLogged,setislogged]=useState(false)
    const [products, setProducts] = useState([]);
    const[orders,setOrders]=useState([])
  
    const [wishlist, setWishlist] = useState([]);
    // const [totalAmount,setAmount]=useState()
   
//    const  data = orders?.reduce(
//       (acc, order) => acc + order.totalAmount,
//       0
//     );

useEffect(()=>{
// setAmount(data)

if(id){
  setislogged(true)
}
},[])

  

const fetchCart=()=>{
  axiosInstance.get('/cart/getCart')
  
  .then((res)=>{
    
    const products = res?.data?.cart?.products || [];
    setCart(products);

  })
  .catch((error)=>{
    console.log(error)

  })
}


useEffect(()=>{                                        
fetchCart()
},[])

  // useEffect(()=>{
  //   axiosInstance.get(`/order/showorder`)

  //   .then((res=>{
  //     const orders=res?.data?.orders||[]
  //       setOrders(orders)
  //   }))
  //   .catch((error)=>{
  //       console.log(error)
  //   })
  // },[])
  useEffect(() => {
    axiosInstance.get(`/order/showorder`)
      .then((res) => {
        const orders = res?.data?.orders || [];
        setOrders(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  const openRazorpayPayment = async (orderData) => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
  
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }
  
    try {
      const { data: order } = await axiosInstance.post("/order/addOrder", {
        name: orderData.fullName,
        address: orderData.address,
        phoneNumber:orderData.phoneNumber,
        state:orderData.state,
        pincode:orderData.pincode,
        paymentMethod: orderData.paymentMethod,
        total: orderData.totalAmount * 100,
         // Amount in paise

      });
  const {razorpayOrderId}=order
      const options = {
        key: 'rzp_test_xF615hXrVFeUOx', // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: "Shoe Store",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          const paymentData = {
            ...orderData,
            paymentId: response.razorpay_payment_id,
            orderId:razorpayOrderId,
            // signature: response.razorpay_signature,
          };

          await axiosInstance.post("/order/verifypayment", paymentData);
          alert("Payment successful! Order placed.");
          window.location.reload()
         
        },
        prefill: {
          name: orderData.fullName,
          contact: orderData.phoneNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  const addtoWishlist=async(productId)=>{
    try{

      const response=await axiosInstance.post(`/wishlist/wishlist/${productId}`)
      axiosInstance.get(`/wishlist/getWishlist`)      
    .then((res)=>{
        
setWishlist(res.data.product)  
      })
      
      
    }catch(error){
     console.log(error)
    }
  }
  //get wishlist
  useEffect(()=>{
    axiosInstance.get('/wishlist/getWishlist')
    .then((res)=>{
      // console.log(res.data.product)
      setWishlist(res.data?.product)
      

    })
    .catch((error)=>{
       console.log(error)
    })
  },[])
  const AddtoCart=async(productId)=>{
    

    try{
      const response=await axiosInstance.post(`/cart/addtocart/${productId}`)
      await axiosInstance.get('/cart/getCart')
      .then((res)=>{
        
        setCart(res.data.cart.products);
  
      })
       }catch(error){
    alert('product not added to the cart')

    }

  }
 
async function RemoveCart (productId){
try {
  await axiosInstance.delete(`/cart/removeFromCart/${productId}`);
  
    
     await axiosInstance.get('/cart/getCart')
     .then((res)=>{
       
       setCart(res.data.cart.products)
 
     })

    //  setCart(remove)
    toast.success("Product removed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored"
    });
} catch (error) {
  console.log(error)
  toast.error("Failed to remove product. Please try again.", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored"
  });
}     

  }

  const removeFromWishlist=async(productId)=>{
   try{
    const response=await axiosInstance.delete(`/wishlist/deletewishlist/${productId}`)
    axiosInstance.get(`/wishlist/getWishlist`)      
    .then((res)=>{
        
setWishlist(res.data.product)  
      })
    console.log(response.data)
    
  }catch(error){
    console.log(error)
  }
}


const incrementQuantity=async(productId)=>{
  try {
    const response=await axiosInstance.put(`/cart/increment/${productId}`)
    await axiosInstance.get('/cart/getCart')
     .then((res)=>{
       
       setCart(res.data.cart.products)
 
     })
  } catch (error) {
    console.log(error)
  }
}
const decrementQunatity=async(productId)=>{
  try{
    const response=await axiosInstance.put(`/cart/decrement/${productId}`)
    await axiosInstance.get('/cart/getCart')
     .then((res)=>{
       
       setCart(res.data.cart.products)
 
     })

  }catch(error){
   console.log(error)
  }
}
const totalAmount=cart?.reduce((acc,item)=>acc+(item.quantity*item.product.price),0)

  return (
    <div>
        <userContext.Provider value={{
          cart,
          setCart,
          AddtoCart,
          RemoveCart,
          incrementQuantity,
          decrementQunatity,
          isLogged,
          setislogged,
          orders,
          addtoWishlist,
          removeFromWishlist,
          openRazorpayPayment,
          totalAmount,
          fetchCart,
          wishlist}}>
            {children}

        </userContext.Provider>
      
    </div>
  )
}

export default Context



