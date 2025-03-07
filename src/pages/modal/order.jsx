import React, { useContext } from "react";
import { userContext } from "../../context/useContext";

const Order = () => {
  const { orders } = useContext(userContext);

  
// console.log(orders,"ordern in order jsx")

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Your Orders</h2>
      
      
      {orders && orders.length > 0 ? (
        <>
          <div className="list-group">
            {orders.map((order, index) => (
              <div
                key={index}
                className="list-group-item mb-3 border-0 shadow-sm rounded"
                style={{ backgroundColor: "#f9f9f9" }}>
                
                <h5 className="mb-3">Order {index + 1}</h5>
                {order?.items.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex align-items-center mb-3 border-bottom pb-3">
                    
                    <img
                      src={item?.productId?.url}
                      alt={item?.productId?.title}
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        marginRight: "15px",
                      }}
                      className="rounded"
                    />
                    
                    <div style={{ flex: 1 }}>
                      <h6 className="mb-1">{item?.productId?.title}</h6>
                      <p className="mb-0 text-muted">
                        Price: ${item?.productId?.price} | Quantity: {item?.quantity}
                      </p>
                      <p className="mb-0">
                        <strong>Total:</strong> ${item?.productId?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
                <p className="mt-3 text-end">
                  <strong>Order Total:</strong> ${(order.total / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12 text-end">
              <h4 className="fw-bold">
                {/* Grand Total: ${(total / 100)?.toFixed(2)} */}
              </h4>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <h4>No orders available.</h4>
        </div>
      )}
    </div>
  );
};

export default Order;
