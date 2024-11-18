import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageslideOn from "../../assets/images/grocery-banner.png"
import imageslidetwo from "../../assets/images/grocery-banner-2.jpeg"
import imageslidethree from "../../assets/images/slider-2.jpeg"

export  function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true

  };
  return (
    <div className="slider-container">
      <Slider {...settings} >
        <div>
          <img className="w-100"  src={imageslideOn} alt="" />
        </div>
        <div>
          <img className="w-100"  src={imageslidetwo} alt="" />
        </div>
        <div>
          <img className="w-100"  src={imageslidethree} alt="" />
        </div>
      </Slider>
    </div>
  );
}

