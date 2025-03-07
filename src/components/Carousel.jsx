import React from 'react';

const ShoeCarousel = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        id="shoeCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ width: "100%"}}
      >
        <div className="carousel-inner">
          
          <div className="carousel-item active">
            <img
              style={{
                height: "300px",
                width: "100%",
                objectFit: "cover",
            
              }}
              src="https://rockcitykicks.com/cdn/shop/files/NikeDunkHIRetroSE_Phantom_RacerBlue-PaleIvory_FV6612-0011.jpg?v=1721920204"
              className="d-block w-100"
              alt="Shoe 1"/>
            
            <div className="carousel-caption d-none d-md-block">
              <h5>Sleek Running Shoes</h5>
              <p>Comfortable and stylish for your daily runs.</p>
            </div>
          </div>

          
          <div className="carousel-item">
            <img
              style={{
                height: "300px",
                width: "100%",
                objectFit: "contain",
              }}
              src="https://crepdogcrew.com/cdn/shop/products/rosewhisper1.png?v=1653983725&width=1500"
              className="d-block w-100"
              alt="Shoe 2"
            />
           
          </div>

          
          <div className="carousel-item">
            <img
              style={{
                height: "300px",
                width: "50%",
                objectFit: "contain",
              }}
              src="https://sneakerplug.co.in/cdn/shop/files/image_34aa60d7-f12b-444e-ac9d-fe25bcf43f12_2048x.jpg?v=1685165189"
              className="d-block w-100"
              alt="Shoe 3"
            />
            
          </div>
        </div>

        
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#shoeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#shoeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ShoeCarousel;
