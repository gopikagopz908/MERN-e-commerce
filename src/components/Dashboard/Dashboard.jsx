import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./Dashboard.css";
import { AdminContext } from '../Admin/AdminContext/Admincontext';
import CountUp from "react-countup";
import ProductCategoryChart from '../Adminsidepages/piechart';

function Dashboard() {
  const { users, products,total,totalRevenue } = useContext(AdminContext);

  return (
    <div className="dashboard-container">
      <div className="container">
        <h3 className='brd-head'>Details</h3>
        <div className="row gy-4"> 
          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
            <div className="card mt-md-4 mt-0 card-brd p-3 text-center" style={{ backgroundColor: "#4B8BF5" }}>
              <h5
                style={{
                  fontWeight: "700",
                  color: "#fff", 
                  fontSize: "20px",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1px",
                  marginBottom: "5px"
                }}
                className="card-title"
              >
                Users
              </h5>
              <p style={{ fontSize: "24px", color: "#fff", fontWeight: "bold" }}>
                <CountUp end={users.length} duration={2.5}/>+</p>
            </div>
          </div>

          
          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
            <div className="card mt-md-4 mt-0 card-brd p-3 text-center" style={{ backgroundColor: "#ffffff" }}>
              <h5
                style={{
                  fontWeight: "700",
                  color: "#4B8BF5",
                  fontSize: "20px",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1px",
                  marginBottom: "5px"
                }}
                className="card-title"
              >
                Products
              </h5>
              <p style={{ fontSize: "24px", color: "blue", fontWeight: "bold" }}>
                <CountUp end={products.length} duration={2.5}/>+</p>
            </div>
          </div>

          
          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
            <div className="card mt-md-4 mt-0 card-brd p-3 text-center" style={{ backgroundColor: "#4B8BF5" }}>
              <h5
                style={{
                  fontWeight: "700",
                  color: "#fff", 
                  fontSize: "20px",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1px",
                  marginBottom: "5px"
                }}
                className="card-title"
              >
                Orders
              </h5>
              <p style={{ fontSize: "24px", color: "#fff", fontWeight: "bold" }}>
                <CountUp end={total?.length} duration={2.5}/>+</p>
            </div>
          </div>

          
          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
            <div className="card mt-md-4 mt-0 card-brd p-3 text-center" style={{ backgroundColor: "#ffffff" }}>
              <h5
                style={{
                  fontWeight: "700",
                  color: "#4B8BF5",
                  fontSize: "20px",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "1px",
                  marginBottom: "5px"
                }}
                className="card-title"
              >
                Revenue
              </h5>
              <p style={{ fontSize: "24px", color: "blue", fontWeight: "bold" }}>
              <CountUp end={totalRevenue} duration={2.5}/>+</p>
            </div>
          </div>
          <ProductCategoryChart/>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
