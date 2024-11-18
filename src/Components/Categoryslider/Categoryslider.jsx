import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../Categoryslider/category.module.css";

import { TailSpin } from "react-loader-spinner";

import useAllcategories from "../Customehooks/useAllcategories";

export default function Categoryslider() {
  const {data,isLoading} = useAllcategories()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

if (isLoading) {
return <div className="d-flex  algin-items-center justify-content-center">
<TailSpin
visible={true}
height="80"
width="80"
color="black"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""
/>
</div>
}

  return (
    <>
     
        <div className="slider-container">
          <Slider {...settings}>
            {data.data.data.map(function (categ) {
              return (
                <div key={categ._id}>
                  <img
                    className={style.img}
                    src={categ.image}
                    alt={categ.name}
                  />
                  <p>{categ.name}</p>
                </div>
              );
            })}
          </Slider>
        </div>
    </>
  );
}
