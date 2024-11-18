
import React from 'react'
import { TailSpin } from 'react-loader-spinner'

import style from '../Category/categories.module.css'
import useAllcategories from '../Customehooks/useAllcategories'
import { Link } from 'react-router-dom'


export default function Categories() {
    
    const {data,isLoading} = useAllcategories()

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
    <>
      <section className="pt-4">
        <div className="container">
          <div className="row rounded-3 my-3 gy-3">
            {data.data.data.map(function (category) {
              return (
                <div key={category._id} className="col-lg-3 col-md-6 col-12">
                  <Link to={`/categorydetails/${category._id}`}className="text-black text-decoration-none"> <div className="card brand" >
                    <div>
                      <img
                        src={category.image}
                        className={style.img}
                     
                      />
                      <div className="cart-title px-2">
                        <h2 className="h5 text-main fw-bold">
                          {category.name}
                        </h2>
                      </div>
                    </div>
                    
                  </div>
                </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
