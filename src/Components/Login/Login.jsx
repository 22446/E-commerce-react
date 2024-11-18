import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authcontext } from "../../Contexts/authContext";
export default function Login() {
  const {token,settoken}=useContext(authcontext)
  const [trueMessage, settrueMessage] = useState(false)  
  const [falseMessage, setfalseMessage] = useState(null) 
  const navigate= useNavigate() 
  const [IsCliced, setIsClicede] = useState(false)  
  const LoginGroup = useFormik({
    initialValues: {
      email: "Mazinsafwat453135@gmail.com",
      password: "Mazinsaf",
    },
    onSubmit: function (values) {
      setIsClicede(true)
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      .then(function(res){
        settrueMessage(true)
        setInterval(() => {
        settrueMessage(false)
        }, 2000);
        localStorage.setItem('userToken',res.data.token)
        settoken(res.data.token)


        navigate('/')
        console.log(res.data.token)
        setIsClicede(false)
      }).catch(function(err){
        setfalseMessage(err.response.data.message)
        setInterval(() => {
        setfalseMessage(null)
          
        }, 2000);
        console.log(err)
        setIsClicede(false)

      })
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("email is required")
        .email("Enter Valid Email"),
      password: yup
        .string()
        .required("password is required")
        .matches(
          /^[A-Z][a-z0-9]{6,10}$/,
          "password must start with upperCase then from 6 to more any chars"
        )
    }),
  });
 return <div className="container mt-5">
      <section className="rounded-4 shadow  my-3 mx-auto">
    <div className="row">
      <div className="col-lg-4 d-none  d-lg-flex align-items-center justify-content-center flex-column  bg-dark text-white ">
        <h1 className="fw-bolder">shop with us.</h1>
        <h6 className="fw-light pt-3 pb-1">Dont have an account? Register now</h6>
        <button type="submit" className="btn btn-main">
          
          <Link className="btn btn-outline-light cursor-pointer" to={'/register'}>
            Register
          </Link>
        </button>
      </div>
      <div className="col-lg-8 col-12">
        <form onSubmit={LoginGroup.handleSubmit} className="p-3">
          <h1 className="h2 my-2 text-center">Login</h1>
          <div className="my-2">
            <label htmlFor="email">Email:</label>
            <input
              value={LoginGroup.values.email}
              onBlur={LoginGroup.handleBlur}
              onChange={LoginGroup.handleChange}
              type="text"
              id="email"
              className="form-control p-2"
            />
            {LoginGroup.errors.email&&LoginGroup.touched.email?<div className="alert alert-danger">{LoginGroup.errors.email}</div>:''}
          </div>
          
          <div className="my-2">
            <label htmlFor="password">Password:</label>
            <div className="d-flex align-items-center justify-content-end">
              <input
                id="password"
                value={LoginGroup.values.password}
                onBlur={LoginGroup.handleBlur}
                onChange={LoginGroup.handleChange}
                type="password"
                className="form-control p-2 position-relative"
              />
            </div>

            {LoginGroup.errors.password &&
            LoginGroup.touched.password ? (
              <div className="alert alert-danger">
                {LoginGroup.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
        
        
          <div className="my-2">
            <button className="btn btn-outline-dark" disabled={IsCliced} type="submit">
             {IsCliced? 'Loading..':  'submit'} 
            </button>
          </div>
          {trueMessage ? (
            <div className="alert alert-success w-100 text-center mt-2">
              Account Createed successfuly
            </div>
          ) : (
            ""
          )}
          {falseMessage ? (
            <div className="alert alert-danger w-100 text-center mt-2">
              {falseMessage}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
</section>;
  </div>
}
