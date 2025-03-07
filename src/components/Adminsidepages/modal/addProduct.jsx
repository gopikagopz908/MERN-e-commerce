import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../../Api/axiosInstance";

const AddProductModal = ({ show, handleClose, onClose, onSubmit }) => {
  
  const validationSchema = Yup.object({
    title: Yup.string().required("Product title is required"),
    image: Yup.mixed(),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    description: Yup.string().required("Description is required"),
    brand: Yup.string().required("Brand is required"),
    model: Yup.string().required("Model is required"),
    color: Yup.string().required("Color is required"),
    category: Yup.string().required("Category is required"),
    discount: Yup.number()
      .required("Discount is required")
      .min(0, "Discount cannot be negative")
      .max(100, "Discount cannot exceed 100%"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative"),
  });

  
  const initialValues = {
    title: "",
    image: "",
    price: "",
    description: "",
    brand: "",
    model: "",
    color: "",
    category: "",
    discount: "",
    stock: "",
  };

  // const handleSubmit = (values, { resetForm }) => {
  //   const formData = new FormData();



  //   for (const key in values) {
  //     formData.append(key, values[key]);
  //   }
  //   console.log(values,"formdataa")


  //   axiosInstance
  //     .post("/products/addproduct",formData,{
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }) 
  //     .then((response) => {
  //       alert("product is added"); 
  //       resetForm(); 
  //       handleClose(); 
  //     })
  //     .catch((error) => {
  //       console.error("Error adding product:", error);
  //     });
  // };


  // const handleSubmit = (values, { resetForm }) => {
  //   const formData = new FormData();
  
  //   for (const key in values) {
  //     if (key === "image" && values[key]) {
  //       formData.append(key, values[key]);
  //     } else {
  //       formData.append(key, values[key]?.toString()); 
  //     }
  //   }
  
  //   console.log("FormData Entries:");
  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }
  // console.log(formData,"formdataaa")
  //   axiosInstance
  //     .post("/products/addproduct", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((response) => {
  //       alert("Product is added");
  //       resetForm();
  //       handleClose();
  //     })
  //     .catch((error) => {
  //       console.error("Error adding product:", error.response?.data || error.message);
  //     });
  // };
  
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
  
    for (const key in values) {
      if (key === "image" && values[key]) {
        formData.append(key, values[key]); // Append the file itself, not just the name
      } else {
        formData.append(key, values[key]?.toString());
      }
    }
  
    console.log("FormData:", Object.fromEntries(formData));
  
    try {
      const response = await axiosInstance.post("/products/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Product added successfully");
      resetForm();
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };
  

  return (
    <div
      className={`modal ${show ? "d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="modal-dialog"
        role="document"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          overflow: "hidden",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <div className="modal-content">
          <div
            className="modal-header"
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <h5 className="modal-title">Add Product</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit} 
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ isSubmitting,setFieldValue,errors}) => (
             
              <Form>
                <div
                  className="modal-body"
                  style={{
                    backgroundColor: "#e9ecef",
                    padding: "20px",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
            <label htmlFor="image" className="form-label">Image:</label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              className="form-control"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                setFieldValue('image', file);
              }}
            />
            <ErrorMessage name='image' component='div' className='text-danger' />
          </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <Field
                      type="text" 
                      id="price"
                      name="price"
                      className="form-control"
                      placeholder="Enter price"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="brand" className="form-label">
                      Brand
                    </label>
                    <Field
                      type="text"
                      id="brand"
                      name="brand"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="brand"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      Model
                    </label>
                    <Field
                      type="text"
                      id="model"
                      name="model"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="model"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>
                    <Field
                      type="text"
                      id="color"
                      name="color"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <Field
                      type="text"
                      id="category"
                      name="category"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="discount" className="form-label">
                      Discount (%)
                    </label>
                    <Field
                      type="number"
                      id="discount"
                      name="discount"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="discount"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="stock" className="form-label">
                      Stock
                    </label>
                    <Field
                      type="number"
                      id="stock"
                      name="stock"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="stock"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div
                  className="modal-footer"
                  style={{
                    backgroundColor: "#f1f3f5",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Add Product
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
