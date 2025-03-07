// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import axiosInstance from '../../../Api/axiosInstance';

// const EditProductModal = ({ show, handleClose, products, onSave }) => {
//   // console.log(products)
//   const initialValues = {
//     title: products?.name || '',
//     price: products?.price || '',
//     description: products?.description || '',
//     category: products?.category || '',
//     stock: products?.stock || '',
//     // brand: products?.brand || '',
//     // model:products?.model || '',
//     // color: products?.color || '',
//     // discount: products?.discount || '',
//   };

//   const validationSchema = Yup.object({
//     Name: Yup.string().required('Product name is required'),
//     price: Yup.number()
//       .required('Price is required')
//       .positive('Price must be greater than zero'),
//     description: Yup.string().required('Description is required'),
//     category: Yup.string().required('Category is required'),
//     stock: Yup.number()
//       .required('Stock is required')
//       .integer('Stock must be an integer')
//       .min(0, 'Stock cannot be negative'),
//     // brand: Yup.string().required('Brand is required'),
//     // model: Yup.string().required('Model is required'),
//     // color: Yup.string().required('Color is required'),
//   //   discount: Yup.number()
//   //     .required('Discount is required')
//   //     .min(0, 'Discount cannot be negative')
//   //     .max(100, 'Discount cannot exceed 100%'),
//    });

//   // const handleSubmit = async(values) => {
//   //   console.log("values", values)
//   //   try {
//   //     await axiosInstance
//   //     .patch('/products/updateProduct', values)
//   //     console.log(res.data)
//   //     alert('edited successfully')
//   //     handleClose();
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // };

//   const handleSubmit = async(values) =>{
//     console.log("values", values)
//   }



//   return (
//     <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
//       <div className="modal-dialog" role="document">
//         <div className="modal-content" style={{ backgroundColor: 'grey' }}>
//           <div className="modal-header">
//             <h5 className="modal-title">Edit Product</h5>
//             <button
//               type="button"
//               className="close"
//               aria-label="Close"
//               onClick={handleClose}
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             enableReinitialize
//           >
//             {({ isSubmitting }) => (
//               <Form>
//                 <div className="modal-body">
                
//                   <div className="form-group">
//                     <label htmlFor="title">Name</label>
//                     <Field type="text" id="title" name="title" className="form-control" />
//                     <ErrorMessage name="title" component="div" className="text-danger" />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="price">Price</label>
//                     <Field type="number" id="price" name="price" className="form-control" />
//                     <ErrorMessage name="price" component="div" className="text-danger" />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="description">Description</label>
//                     <Field
//                       as="textarea"
//                       id="description"
//                       name="description"
//                       className="form-control"
//                     />
//                     <ErrorMessage name="description" component="div" className="text-danger" />
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="stock">Stock</label>
//                     <Field type="number" id="stock" name="stock" className="form-control" />
//                     <ErrorMessage name="stock" component="div" className="text-danger" />
//                   </div>
//                   {/* <div className="form-group">
//                     <label htmlFor="brand">Brand</label>
//                     <Field type="text" id="brand" name="brand" className="form-control" />
//                     <ErrorMessage name="brand" component="div" className="text-danger" />
//                   </div> */}
//                   {/* <div className="form-group">
//                     <label htmlFor="model">Model</label>
//                     <Field type="text" id="model" name="model" className="form-control" />
//                     <ErrorMessage name="model" component="div" className="text-danger" />
//                   </div> */}
//                   {/* <div className="form-group">
//                     <label htmlFor="color">Color</label>
//                     <Field type="text" id="color" name="color" className="form-control" />
//                     <ErrorMessage name="color" component="div" className="text-danger" />
//                   </div> */}
//                   <div className="form-group">
//                     <label htmlFor="category">Category</label>
//                     <Field as="select" id="category" name="category" className="form-control">
//                       <option value="" disabled>
//                         Select Category
//                       </option>
//                       <option value="casual">Casual</option>
//                       <option value="sports">Sports</option>
//                       <option value="running">Running</option>
//                     </Field>
//                     <ErrorMessage name="category" component="div" className="text-danger" />
//                   </div>
//                   {/* <div className="form-group">
//                     <label htmlFor="discount">Discount (%)</label>
//                     <Field type="number" id="discount" name="discount" className="form-control" />
//                     <ErrorMessage name="discount" component="div" className="text-danger" />
//                   </div> */}
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={handleClose}>
//                     Close
//                   </button>
//                   <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
//                     Save changes
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductModal;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../../Api/axiosInstance';

const EditProductModal = ({ show, handleClose, products }) => {
  const initialValues = {
    title: products?.title|| '',
    price: products?.price || '',
    description: products?.description || '',
    category: products?.category || '',
    stock: products?.stock || '',
  };


  const validationSchema = Yup.object({
    title: Yup.string().required('Product title is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be greater than zero'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    stock: Yup.number()
      .required('Stock is required')
      .integer('Stock must be an integer')
      .min(0, 'Stock cannot be negative'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form submitted with values:', values);
      const response = await axiosInstance.patch('/products/updateProduct', {...values, _id:products._id});
      console.log("edit response",response.data);
      alert('Product edited successfully');
      handleClose();
    } catch (error) {
      console.error('Error editing product:', error);
      alert('Failed to edit product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ backgroundColor: 'grey' }}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button type="button" className="close" aria-label="Close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field type="text" id="title" name="title" className="form-control" />
                    <ErrorMessage name="title" component="div" className="text-danger" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <Field type="number" id="price" name="price" className="form-control" />
                    <ErrorMessage name="price" component="div" className="text-danger" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field as="textarea" id="description" name="description" className="form-control" />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <Field type="number" id="stock" name="stock" className="form-control" />
                    <ErrorMessage name="stock" component="div" className="text-danger" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <Field as="select" id="category" name="category" className="form-control">
                      <option value="" disabled>Select Category</option>
                      <option value="casual">Casual</option>
                      <option value="sports">Sports</option>
                      <option value="running">Running</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="text-danger" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Save changes
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

export default EditProductModal;
