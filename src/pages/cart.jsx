import React, { useContext } from 'react';
import { userContext } from '../context/useContext';

 import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

function Cart() {
  const { cart=[], RemoveCart, incrementQuantity,decrementQunatity } = useContext(userContext);

  const totalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  const navigate=useNavigate()

const handleIncrement = (id) => {
  incrementQuantity(id, 1);
};

const handleDecrement = (id, quantity) => {
  if (quantity > 1) {
    decrementQunatity(id, -1);
  }
};
  
  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h2 >Shopping Cart</h2>
        
      </div>
      
        <div className='d-flex justify-content-end'>

 <strong className="me-3">Total: ${totalAmount.toFixed(2)}</strong>
          <button
            className="btn btn-success"
            onClick={()=>navigate('/order')}//form
            disabled={cart.length === 0} >
            Buy Now
          </button>
        </div>
      {cart.length > 0 ? (
        <div className="row g-3">
          {cart.map((item) => (
            <div key={item.product._id} className="col-md-4">
              <div className="card">
                <img
                  src={item.product.url}
                  alt={item.product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product.name}</h5>
                  <div className='d-flex align-items-center justify-content-between'>
  <p className="card-text mb-0">
    Price: <strong>${item.product.price.toFixed(2)}</strong>
  </p>
  <p className="card-text mb-0" style={{ marginLeft: '20px' }}>
    Total: <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
  </p>
</div>


                   <p className="card-text">
                    Quantity:
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() => handleIncrement(item.product._id)}
                    >
                      +
                    </button>
                    <strong className="mx-2">{item.quantity}</strong>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleDecrement(item.product._id, item.quantity)}
                    >
                      -
                    </button>
                  </p>
                    <button
                    className="btn btn-primary btn-sm ms-3"
                  style={{ marginTop: '-10px', position: 'relative',width:'200px',height:"40px" }}                      
                  onClick={() => RemoveCart(item.product._id)}
                    >
                      Remove
                    </button>
                 
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
  );
}

export default Cart;
