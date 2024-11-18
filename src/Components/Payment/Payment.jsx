import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { AddtoCartContext } from '../../Contexts/AddtoCardContext'
import * as yup from 'yup'

export default function Payment() {
   const {data}= useContext(AddtoCartContext)

    const [IsCliced, setIsCliced] = useState(false)
    const PaymentGruop=useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:''
        },
    onSubmit:function(values){
        setIsCliced(true)
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${data.data.data._id}?url=http://localhost:5173`,{shippingAddress:values},
            {headers:{token:localStorage.getItem('userToken')}}
        ).then(function(res){
            window.open(res.data.session.url,'_self')
            console.log(res)
            setIsCliced(false)
        }).catch(function(err){
            console.log(err)
            setIsCliced(false)

        })
    },
    validationSchema:yup.object().shape({
      details:yup.string().required('details is required'),
      phone:yup.string().required('phone is required'),
      city:yup.string().required('city is required'),
    })
    })

  return (
    <div className="container">
    <div className="row">
    <div className="col-lg-8 mx-auto col-12">
        <form onSubmit={PaymentGruop.handleSubmit} className="p-3">
          <h1 className="h2 my-2 text-center">User Details</h1>
          <div className="my-2">
            <label htmlFor="details">Addres details:</label>
            <input
              value={PaymentGruop.values.details}
              onBlur={PaymentGruop.handleBlur}
              onChange={PaymentGruop.handleChange}
              type="text"
              id="details"
              className="form-control p-2"
            />
            <div>
              {PaymentGruop.errors.details&& PaymentGruop.touched.details?
              <p className='alert alert-danger'>{PaymentGruop.errors.details}</p>  
            :''}
              
            </div>
            </div>
          
          <div className="my-2">
            <label htmlFor="phone">phone:</label>
            <div className="d-flex align-items-center justify-content-end">
              <input
                id="phone"
                value={PaymentGruop.values.phone}
                onBlur={PaymentGruop.handleBlur}
                onChange={PaymentGruop.handleChange}
                type="text"
                className="form-control p-2 position-relative"
              />
            </div>
            <div>
              {PaymentGruop.errors.phone&& PaymentGruop.touched.phone?
              <p className='alert alert-danger'>{PaymentGruop.errors.phone}</p>  
            :''}
              
            </div>
          </div>
          
          <div className="my-2">
            <label htmlFor="city">city:</label>
            <div className="d-flex align-items-center justify-content-end">
              <input
                id="city"
                value={PaymentGruop.values.city}
                onBlur={PaymentGruop.handleBlur}
                onChange={PaymentGruop.handleChange}
                type="text"
                className="form-control p-2 position-relative"
              />
            </div>
            <div>
              {PaymentGruop.errors.city&& PaymentGruop.touched.city?
              <p className='alert alert-danger'>{PaymentGruop.errors.city}</p>  
            :''}
              
            </div>
          </div>
        
        
          <div className="my-2">
            <button className="btn btn-outline-dark" disabled={IsCliced} type="submit">
             {IsCliced? 'Loading..':  'submit'} 
            </button>
          </div>
          
        </form>
        </div>
        </div>
      </div>
  )
}
