import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaBan } from "react-icons/fa";
import { AdminContext } from "../Admin/AdminContext/Admincontext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

const UsersTable = () => {
  const navigate=useNavigate()
  const{users,handleBlock}=useContext(AdminContext)

  // const filtered = data.users.filter((item) => item.role !== "admin");

 
  

  const handleViewOrders = async (id) => {
  try {

      navigate(`view/${id}`);

      alert(`Viewing orders for user with ID ${id}.`);
    } 
   catch (error) {
    console.error('Error fetching orders:', error);
    alert('An error occurred while fetching orders.');
  }
};


  return (
    <div className="container mt-2 ">
      <h3 style={{
    justifyContent: "center", 
    textAlign: "center", 
    fontFamily: "'Garamond', serif",
    fontSize:"25px",
    fontWeight:"bold"
  }}  className="mb-4">Users List</h3>
      <table className="table table-bordered table-striped  ">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#f0f0f0 !important" }}>
        
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button style={{width:"100px",height:"35px"}}
                  onClick={() => handleViewOrders(user._id)}
                  className="border-0 rounded-2 text-white bg-dark ms-2">
                  
                
                  <FaEye className="me-1" />  Orders
                  </button>
                
                <button
                  style={{
                    backgroundColor: user?.isBlocked? "#4CAF50": "#FF4D4D",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    justifyContent:"center",
                    alignItems:"center",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    height:"35px",
                    width:"80px",
                    marginLeft:"10px"
                  }}
                  onClick={() => handleBlock(user)}>
                  
                
               {user?.isBlocked?"unblock":"block"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
