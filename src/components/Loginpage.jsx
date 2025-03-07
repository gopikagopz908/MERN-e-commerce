import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Loginpage.css'; 
import { userContext } from '../context/useContext';
import axiosInstance from '../Api/axiosInstance';
import { AuthContext, useAuth } from '../context/AuthContext';


const validationSchema = Yup.object({
  email: Yup.string()
    .email("valid email is required")
    .required('email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Loginform = () => {
  const navigate = useNavigate();
  const{setislogged}=useContext(userContext)
  const [userdata, setUserdata] = useState([]);
  const {role,setRole}=useAuth();
  
 
  
  const handleSubmit = async (values) => {
    try {
      console.log(values)
      const response = await axiosInstance.post('/user/login', values);
     
      const userRole = response.data.user.role ;
      setRole(response.data.user.role)
      localStorage.setItem("role",response.data.user.role)
      
      // Show different alerts based on role
     
        alert('User logged in successfully');
      
  
      // Navigate based on role
      navigate( '/');
      
    } catch (error) {
      console.log(error,"errr")
      alert('User login failed');
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
                <Link to="/register"> don't have an account?</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Loginform;
