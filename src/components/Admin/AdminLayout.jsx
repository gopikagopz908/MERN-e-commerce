import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { FaHome, FaUsers, FaBoxOpen, FaShoppingCart, FaTimes } from "react-icons/fa";
import { TbLockOpenOff } from "react-icons/tb";
import { Outlet } from "react-router-dom";

import Navbar from "./Adminnav";
 import { AdminContext } from "./AdminContext/Admincontext";

const AdminLayout = () => {
  
  const { toggled, setToggled, broken, setBroken } = useContext(AdminContext);
//  const strg= localStorage.getItem("adminId")

  
  const handleToggle = () => {
    setToggled(!toggled);
  };
//  if(!strg) return<h1>no access</h1>
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar
        toggled={toggled}
        customBreakPoint="800px"
        onBreakPoint={setBroken}
        style={{
          background: "linear-gradient(145deg, #e0f7fa, #b3e5fc)", 
          color: "#0077b6", 
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)", 
        }}
      >
        
        <div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "10px 10px",
            color:"white", 
            backgroundColor:"blue",
             fontFamily:"Georgia( 'Times New Roman', Times, serif)",

            fontWeight: "bold",
            
            fontSize: "1.5rem",
            borderBottom: "2px solid blue",
            height:"57px"
          }}>
        
          ShoeZone
          {broken && (
            <button
              onClick={handleToggle}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "1.4rem",
                color: "black",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          )}
        </div>

        
        <Menu>
          <MenuItem component={<Link to="/admin" style={{color:"black",fontSize:"15px",fontWeight:"bold"}}/>} icon={<FaHome />}>Home</MenuItem>

          <MenuItem component={<Link to="/Admin/users"
        style={{color:"black",fontSize:"15px",fontWeight:"bold"}}/>} icon={<FaUsers />}>
    Users</MenuItem>

          <MenuItem component={<Link to="/Admin/products/All"
           style={{color:"black",fontSize:"15px",fontWeight:"bold"}}/>} icon={<FaBoxOpen />}>Products</MenuItem>

          <MenuItem  component={<Link to="/admin/totalorders" style={{color:"black",fontSize:"15px",fontWeight:"bold"}}/>}icon={<FaShoppingCart />}>Orders</MenuItem>

          <MenuItem component={<Link to="/admin/block" style={{color:"black",fontSize:"15px",fontWeight:"bold"}}/>}icon={<TbLockOpenOff />}>Block</MenuItem>
        </Menu>
      </Sidebar>

      
      <main style={{ width: "100%",overflow:"hidden" }}>
        <div style={{ width: "100%" }}>
          <Navbar />
          <div style={{ overflowY: "auto", height: "100vh" }}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
