import React from "react";
import imgone from '../../assets/images/amazon-pay.png'
import imgtwo from '../../assets/images/American-Express-Color.png'
import imgthree from '../../assets/images/paypal.png'
import imgofour from '../../assets/images/mastercard.webp'
import imgofive from '../../assets/images/icons8-cartHead.gif'
import style from '../Fotter/fotter.module.css'
export default function Fotter() {
  return (
  
      <footer className="bg-dark text-white py-3">
        <div className="container">
          <h3 className="h3 m-0 text-center fw-bold py-1">
           Payment partners
          </h3>
          <div className="pay-details d-flex justify-content-center align-items-center">
            <div className="d-flex align-items-center justify-content-center">
              <hr />
              <img src={imgone} className={style.width} alt />
              <img
                src={imgtwo}
                className={style.width}
                alt
              />
              <img src={imgthree} className={style.width} alt />
              <img src={imgofour} className={style.width} alt />
            </div>
          </div>
          <div class="navbar-brand d-flex nowrap align-items-center justify-content-center">
        <div>
        <img src={imgofive} alt=""/>
        </div><div><span class="fw-bold">details.© 2024 HappyCart. All Rights Reserved</span></div>
      </div>
  
          </div>

      </footer>

  );
}
