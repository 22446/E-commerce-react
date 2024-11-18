import React, { useContext, useEffect } from "react";
import Addtocart, { AddtoCartContext } from "../Contexts/AddtoCardContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import imgone from'../assets/images/empty.gif'
import { TailSpin } from "react-loader-spinner";

export default function Cart() {
  const { data, isLoading, DeleteAllItems,getAllProducts ,deleteSpecificItem,updateCartCount} = useContext(AddtoCartContext);
 async function handleUpdateCount(id,count){
    const isflag=await updateCartCount(id,count)
    if(isflag){
      console.log(true)
    }else{
      console.log(false)
    }
  }
  async function handleDeleteSpecificItem(id){
    const isflag=await deleteSpecificItem(id)
    if(isflag){
      console.log(true)
      toast.success('Successfully removed from cart!');
    }else{
      console.log(false)
      toast.error('error');
    }
  }
 
  async function handleDeleteItems(){
    const isflag=await DeleteAllItems()
    if(isflag){
      console.log(true)
      toast.success('Successfully delete cart!');
    }else{
      console.log(false)
      toast.error('error');
    }
  }
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
  

  console.log(data);
  return (
    <section className="pt-5 my-5">
      <div className="container bg-main-light  py-5   shadow">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <button className="btn btn-danger p-2" disabled={data?.data.numOfCartItems==0} onClick={()=>{handleDeleteItems()}}>Clear All</button>
          </div>
          <div>
            <button className="btn btn-success p-2" disabled={data?.data.numOfCartItems==0}><Link className="text-white text-decoration-none" to={'/payment'}>Check Out</Link></button>
          </div>
        </div>
        <h1 className="text-main my-2">SHOP CART </h1>
        <h4 className="text-main my-2">Total Price:{data?data.data.data.totalCartPrice:''}</h4>
        {data && data.data.numOfCartItems>0? (
            data.data.data.products.map(function (product) {
              return (<div className="row gx-2 border-bottom  p-3">
                  <div className="col-md-2 col-12">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt="item.product.title"
                    />
                  </div>
                  <div className="col-md-10 col-12 d-flex align-items-center justify-content-between">
                    <div>
                      <p className="p-0">
                        {product.product.title.split(" ", 2).join(" ")}
                      </p>
                      <p className="p-0">
                        
                        Price : {product.price * product.count} EGP
                      </p>
                      
                      <i role="button" className="fa-solid fa-trash fa-2x text-danger" onClick={()=>{handleDeleteSpecificItem(product.product._id)}}/>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <i role="button" className="fa-solid fa-circle-plus fa-2xl text-success " onClick={()=>handleUpdateCount(product.product._id,product.count+1)}/>
                      <span>{product.count}</span>
                      <i role="button" className="fa-solid fa-circle-minus fa-2xl text-danger " onClick={()=>handleUpdateCount(product.product._id,product.count-1)}/>
                    </div>
                  </div>
                </div>
              
              );
            })
          ) : (
            <>
              <div className="d-flex align-items-center flex-column justify-content-center text-center flex-column">
                <img src={imgone} alt />
                <h1 className="fw-bold text-center">
                  Your Cart Is Empty
                  <Link to="/" className="link-info">
                    Add Now
                  </Link>
                </h1>
              </div>
            </>
          )}
        </div>
    
    </section>
  );
}
