



import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { userContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  paymentMethod: Yup.string().required("Please select a payment method"),
});

const paymentOptions = [
  {
    value: "razorpay",
    label: (
      <div className="d-flex align-items-center">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/razorpay-3628701-3030137.png"
          alt="Razorpay"
          width="30"
          height="30"
          style={{ marginRight: "10px" }}
        />
        Razorpay
      </div>
    ),
  },
];

const OrderDetails = () => {
  const navigate = useNavigate();
  const { cart, totalAmount, openRazorpayPayment } = useContext(userContext);

  const handleOrderSubmit = async (values) => {
    const orderData = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      state: values.state,
      pincode: values.pincode,
      paymentMethod: values.paymentMethod,
      cartItems: cart,
      totalAmount,
      date: new Date().toISOString(),
    };
    // console.log(orderData,"hdhcuduyghgh")

    if (values.paymentMethod === "razorpay") {
      const data=await openRazorpayPayment(orderData);
    } else {
      console.log("Other payment methods can be handled here.");
    }
  };

  return (
    <div className="container mt-5 justify-content-center">
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333", fontSize: "1.5rem" }}>
          Order Details
        </h2>
        <Formik
          initialValues={{
            fullName: "",
            phoneNumber: "",
            address: "",
            state: "",
            pincode: "",
            paymentMethod: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleOrderSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <Field type="text" id="fullName" name="fullName" className="form-control form-control-sm" />
                <ErrorMessage name="fullName" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <Field type="text" id="phoneNumber" name="phoneNumber" className="form-control form-control-sm" />
                <ErrorMessage name="phoneNumber" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <Field as="textarea" id="address" name="address" className="form-control form-control-sm" rows="3" />
                <ErrorMessage name="address" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <Field type="text" id="state" name="state" className="form-control form-control-sm" />
                <ErrorMessage name="state" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <Field type="text" id="pincode" name="pincode" className="form-control form-control-sm" />
                <ErrorMessage name="pincode" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method
                </label>
                <Field name="paymentMethod">
                  {({ field, form }) => (
                    <Select
                      options={paymentOptions}
                      onChange={(option) => form.setFieldValue("paymentMethod", option.value)}
                      value={paymentOptions.find((option) => option.value === form.values.paymentMethod)}
                      className="basic-select"
                      classNamePrefix="select"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          padding: "0",
                          fontSize: "14px",
                        }),
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="paymentMethod" component="div" className="text-danger mt-1" />
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  Place Order
                 
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OrderDetails;
