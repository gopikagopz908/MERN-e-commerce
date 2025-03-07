import axios from 'axios';
import React, { useState,useEffect, useContext } from 'react';
import Admin, { AdminContext } from '../Admin/AdminContext/Admincontext';

const BlockTable = () => {
  const{handleBlock,users}=useContext(AdminContext)
  
const filtered=users.filter((item)=>item.role!=="admin")
  

  return (
    <>
     <h3 style={{
    justifyContent: "center", 
    textAlign: "center", 
    fontFamily: "'Garamond', serif",
    fontSize:"25px",
    fontWeight:"bold"}}>Users</h3>
    <div style={{ padding: "10px" ,backgroundColor:"lightgrey"}}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            {/* <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>No</th> */}
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              
              {/* <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user+1}</td> */}
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.username}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{user.email}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
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
                    width:"80px"
                  }}
                  onClick={() => handleBlock(user)}>
                  
                
               {user?.isBlocked?"unblock":"block"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default BlockTable;


