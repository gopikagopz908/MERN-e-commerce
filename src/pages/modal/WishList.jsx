import React from 'react';
import { useContext } from 'react';
import { userContext } from '../../context/useContext';
import ProductCard from '../../components/Productscard/Productcard';

function Wishlist({ show, onClose }) {
    const{addtoWishlist,wishlist=[],removeFromWishlist}=useContext(userContext);
  if (!show) return null;
// console.log(wishlist)
  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">My Wishlist</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          {/* <div className="modal-body">
            <p>Your wishlist is currently empty!</p>
          </div> */}
          {wishlist.length===0?<p>Your wishlist is currently empty!</p>
          :wishlist.map((product) => ( <div  key={wishlist._id} className="col-md-8 col-sm-6 mb-3">
                  <div
                   
                    style={{
                      background: "linear-gradient(to right, #00c6ff, #0072ff, #3a8dff)",
                      height: "30px",
                    }}
                    className="mycard shadow p-3 mb-5 bg-body rounded"
                  >
                    <img
                      src={product.url
                      }
                      className="card-img-top"
                      alt={product.title}
                      style={{
                        backgroundColor: "white",
                        height: "180px",
                        objectFit: "cover",
                        borderTopLeftRadius: "calc(.25rem - 1px)",
                        borderTopRightRadius: "calc(.25rem - 1px)",
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5
                        className="card-title text-truncate"
                        style={{ fontSize: "1rem" }}
                      >
                        {product.name}
                      </h5>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="text-primary fw-bold">${product.price}</span>
           
                        <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(product._id)
                }}
                className="btn btn-primary btn-sm style={{margin-top:-8}}"
                >
                Remove from Wishlist
                {/* removeFromWishlist(product._id) */}
              </button>
                </div>
                    </div>
                  </div>
                </div>
        ))}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;