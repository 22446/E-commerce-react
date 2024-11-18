import React from "react";
import { useQuery } from "react-query";
import axios  from "axios";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Brands() {
  function GetALLbrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery({
    queryKey: "allBrands",
    queryFn: GetALLbrands,
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
    <>
      <section className="pt-4">
        <div className="container">
          <div className="row rounded-3 my-3 gy-3">
            {data.data.data.map(function (brand) {
              return (
                <div className="col-lg-3 col-md-6 col-12">
                  <div className="card brand">
                    <Link to={`/branddetails/${brand._id}`} className="text-black text-decoration-none">
                    <div>
                      <img
                        src={brand.image}
                        className="w-100 card-img-top"
                     
                      />
                      <div className="cart-title px-2">
                        <h2 className="h5 text-main fw-bold">
                          {brand.name}
                        </h2>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
