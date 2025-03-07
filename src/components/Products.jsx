import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./Productscard/Productcard";
import { useParams } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";

function Products() {
  const{category}=useParams()
  const [products, setProducts] = useState([]); 
  useEffect(() => { 
    axiosInstance
      .get("/products",{
      
      })

      .then((res) => {
       if(!category){
        setProducts(res?.data.products)
        
       }else{
        setProducts(res?.data?.products?.filter((item) => item?.brand?.toLowerCase() === category?.toLowerCase()) || []);
      } 
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [category]);
  // console.log(products)
  return (
    <div className="container">
      <div className="row">
        {products?.map((product) => (<ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
