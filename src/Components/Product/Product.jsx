import axios from "axios";
import toast from 'react-hot-toast';
import React, { useContext, useState } from "react";
import {TailSpin} from 'react-loader-spinner'
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Addtocart, { AddtoCartContext } from "../../Contexts/AddtoCardContext";
import { wishtListContext } from "../../Contexts/AddTowishListcontext";

export default function Product() {

    const {AddProductTowishList}=  useContext(wishtListContext)
    async function handleAddToWishList(id){
      const isFlag=await AddProductTowishList(id)

      if(isFlag){
      toast.success('Successfully added to wishlist!');

      }else{
      toast.error('error added to wishlist!');

      }
    }
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
   function GetAllProduct() {

    return axios.get("https://ecommerce.routemisr.com/api/v1/products"
    );
    
  }
 
 const{data,isLoading} =useQuery({
    queryKey:'allProducts',
    queryFn:GetAllProduct
  })
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
   
      <section className="pt-4">
        <div className="container">
          <div className="row rounded-3 my-3 gy-3">
             {data.data.data.map(function (product) {
                  return (
                    <div key={product._id} className="col-lg-3 col-md-6 col-12">
                    
                      <div className="card product">
                        <div>
                        <button onClick={()=>{handleAddToWishList(product._id)}}  className="btn btn-outline-dark end-0  m-1 position-absolute">
                          <i class="fa-solid fa-heart"></i>
                          </button>
                      <Link to={`/productdetails/${product._id}`} className="text-black text-decoration-none">
                          <img
                            src={product.imageCover}
                            className="w-100 card-img-top"
                            alt={product.category.name}
                          />
                         
                          <div className="cart-title px-2">
                            <h2 className="h5 text-main fw-bold">
                              {product.category.name}
                            </h2>
                            <h3 className="h6">
                              {product.title.split(" ", 2).join(" ")}
                            </h3>
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="fw-bold fs-5">
                                {product.price} EGP
                              </span>
                              <span className="fs-5">
                                <i className="fa fa-star rating-color"></i>
                                {product.ratingsAverage}
                              </span>
                            </div>
                          </div>
                            </Link>
                        </div>
                        <div className="py-2 mx-2">
                          <button onClick={()=>{addtocarthandle(product._id)}}  disabled={loadingId==product._id} className="btn btn-outline-dark SlidUP   w-100">
                          +Add to cart
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  );
                })
              
              }</div>
        </div>
      </section>
   
  );
}
