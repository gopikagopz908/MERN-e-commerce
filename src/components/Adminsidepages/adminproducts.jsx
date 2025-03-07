import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import Admin, { AdminContext } from "../Admin/AdminContext/Admincontext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import EditProductModal from "./modal/editProduct";
import AddProductModal from "./modal/addProduct";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";



const ProductTable = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(AdminContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        const allProducts = res.data.products;
        if (category === "All") {
          setFilteredProducts(allProducts);
        } else {
          setFilteredProducts(allProducts.filter((item) => item.category === category));
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category, showModal, addModal]);

  const handleNavigation = (event) => {
    const value = event.target.value;
    if (value) {
      navigate(`/Admin/products/${value}`);
    }
  };

  const handleEdit =(products) => {
    try {
      // console.log(products);
      
      setSelectedProduct(products)
      setShowModal(true);
    } catch (error) {
      console.error("Error updating product details:", error);
      alert("Failed to update product details.");
    }
};


  const handleAdd = () => {
   
    setAddModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
    setAddModal(false);
  };

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.patch(`/products/deleteProduct/${productId}`);
      alert("Product deleted successfully");
      setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-start justify-content-md-center position-relative">
        <h3
          style={{
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "'Garamond', serif",
            fontSize: "25px",
            fontWeight: "bold",
          }}
          className="mb-4"
        >
          Product List
        </h3>
        <div className="position-absolute end-0 d-flex">
          <button
            style={{ marginRight: "10px", height: "40px" }}
            className="btn btn-dark"
            onClick={handleAdd}
          >
            Add
          </button>
          <div>
            <select
              value={category || "All"}
              onChange={handleNavigation}
              className="form-select"
              aria-label="Category Select"
            >
              <option value="All">All</option>
              <option value="sports">Sports</option>
              <option value="running">Running</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table table-hover table-bordered table-striped shadow-lg rounded">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.title}</td>
              <td>
                <img
                  src={product.url}
                  alt={product.title}
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
              </td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category || "N/A"}</td>
              <td>
                <button
                  style={{ width: "80px", height: "35px" }}
                  onClick={() => handleEdit(product)}
                  className="border-0 rounded-3 bg-secondary btn-sm text-white"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  style={{ width: "80px", height: "35px", marginTop: "5px" }}
                  onClick={() => handleDelete(product._id)}
                  className="border-0 rounded-3 bg-danger btn-sm text-white"
                >
                  <FaTrashAlt /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        products={selectedProduct}
        handleSave={handleSave}
      />
      <AddProductModal
        show={addModal}
        handleClose={() => setAddModal(false)}
        handleSave={handleSave}
      />
    </div>
  );
};

export default ProductTable;
