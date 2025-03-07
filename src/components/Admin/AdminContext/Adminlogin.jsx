import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { userContext } from '../../../context/useContext';
import axiosInstance from '../../../Api/axiosInstance';

import { useAuth } from '../../../context/AuthContext';



const validationSchema = Yup.object({
  email: Yup.string()
    .email("valid email is required")
    .required('email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginformAdmin= () => {
  const navigate = useNavigate();
  const{setislogged}=useContext(userContext)
  const [userdata, setUserdata] = useState([]);
  const {role,setRole}=useAuth();
  
 
  
  const handleSubmit = async (values) => {
    try {
   
      const response = await axiosInstance.post('/admin/login', values);
     console.log(response.data)
      const userRole = response.data.admin.role ;
           setRole(response.data.admin.role)
      localStorage.setItem("role",response.data.admin.role)
      
      // Show different alerts based on role
     
        alert('Admin logged in successfully');
   
  
      // Navigate based on role
      navigate( '/admin' );
      
    } catch (error) {
      console.log(error,"errr")
      alert('admin login failed');
    }
  };
  
  return (
    <div className="container-fluid login-form d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginformAdmin;
