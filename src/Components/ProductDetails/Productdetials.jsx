import axios from "axios";
import toast from 'react-hot-toast';
import React, { useContext, useState } from "react";
import {TailSpin} from 'react-loader-spinner'
import { useQuery } from "react-query";

import  { AddtoCartContext } from "../../Contexts/AddtoCardContext";
import { useParams } from "react-router-dom";

export default function Productdetials() {
  const {addProductToCart}=  useContext(AddtoCartContext)
  const [loadingId, setLoadingId] = useState(null);
async  function addtocarthandle(id){

  setLoadingId(id)
  const Isflag = await addProductToCart(id)
  if(Isflag){
    toast.success('Successfully added to cart!');
  }else{
    toast.error('error added to cart!');

  }
  setLoadingId(null)
  }
  const { id } = useParams();
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });
  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: 'calc(100vh - 60px)' }}>
        <TailSpin 
          className='h-100'
          visible={true}
          height="80"
          width="80"
          color="black"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ height: 100 }}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <section>
      <div className="container">
        <div className="row align-items-center ">
          <div className="col-md-3 col-12">
            <img className="w-100" src={data.data.data.imageCover} alt="" />
          </div>
          <div className="col-md-9 col-12">
            <div className="px-2 my-3">
              <h2 className="fw-bold text-main fw-bold">
                {data.data.data.category.name}
              </h2>
              <h3>{data.data.data.description.split(" ",7).join(" ")}</h3>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="fw-bold fs-5">
                    {data.data.data.price} EGP
                  </span>
                </div>
                <div>
                  <span className="fw-bold">
                    {data.data.data.ratingsAverage}
                  </span>
                </div>
              </div>
              <div className="py-2 my-2">
                <button onClick={()=>{addtocarthandle(id)}} disabled={loadingId==id} className="btn btn-outline-dark   w-100">
                  +Add To Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
