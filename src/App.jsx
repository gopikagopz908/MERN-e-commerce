import React, { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route,Link, useNavigate, Navigate } from 'react-router-dom'
import Home from './components/Home'

import LoginForm from './components/Loginpage'
import RegistrationForm from './components/Regiteration'
import Layout from './pages/Layout.jsx/Layout'
import Products from './components/Products'
import Cart from './pages/cart'
import OrderDetails from './pages/Orderform'
import Order from './pages/modal/order'

import AdminLayout from './components/Admin/AdminLayout'
import Dashboard from './components/Dashboard/Dashboard'
import ProductTable from './components/Adminsidepages/adminproducts'
import UsersTable from './components/Adminsidepages/AdminUsers'
import OrdersList from './components/Adminsidepages/Totalorders'
import BlockTable from './components/Adminsidepages/BlockTable'
import ViewOrders from './components/Adminsidepages/modal/viewOrders'
import { ToastContainer } from 'react-toastify'
import { useAuth } from './context/AuthContext'
import LoginformAdmin from './components/Admin/AdminContext/Adminlogin'


function App() {
  
// const role=localStorage.getItem("role");
const {role,setRole}=useAuth();
console.log(role)

  return (
    <>
    <Router>
      
      <Routes>
        {role==="admin"?
       (
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="products/:category" element={<ProductTable/>}/>
          <Route path="users"  element={<UsersTable/>}/>
          <Route path="users/view/:id" element={<ViewOrders/>}/>
          <Route path="totalorders" element={<OrdersList/>}/>
          <Route path="block" element={<BlockTable/>}/>
        </Route>)
          :(
            <Route path="/admin/*" element={<Navigate to="/" />} />//rediredt non admin users
          )}
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path=":category" element={<Products/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/order" element={<OrderDetails/>}/>
          <Route path="/orders" element={<Order/>}/>
         
        
          
        </Route>
        
          <Route path="/register" element={<RegistrationForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/loginAdmin" element={<LoginformAdmin/>}/>

      </Routes>
    </Router>
    
      
    <ToastContainer  />
    </>
  )
}

export default App
