import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [mesageTrue, setmessageTrue] = useState(false);
  const [mesageFalse, setmessageFalse] = useState(null);
  const navigate=useNavigate()
  const [IsCliced, setiscliced] = useState(false);
  const [IsClicedone, setisclicedone] = useState(false);
  const [Isclicked, setIsclicked] = useState(false)  

  function Isclickedd(){
    setIsclicked(!Isclicked)
  }
  function Isclickeddone(){
    setisclicedone(!IsClicedone)
  }

  const registerGroup = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      rePassword: "",
      password: "",
    },
    onSubmit: function registerUser(values) {
      
        setiscliced(true)
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then(function (res) {
            setmessageTrue(true);

          setTimeout(() => {
            setmessageTrue(false);
          }, 2000);
        setiscliced(false)
        navigate('/login')
         
        })
        .catch(function (err) {
            setmessageFalse(err.response.data.message);

          setTimeout(() => {
            setmessageFalse(null)
          }, 2000);
          setiscliced(false)
        });
    },
    // validate: function (values) {
    //   const errors = {};
    //   const NameRejex = /^.{3,20}$/;
    //   const phoneRejex = /^01[0125][0-9]{8}$/;
    //   const emailRejex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    //   ;
    //   const passwordRejex = /^\[A-Z][a-z0-9]{6,10}$/;
    //   if (!NameRejex.test(values.name)) {
    //     errors.name =
    //       "Name Should be more than or equal  3 chars Name Should be less than or equal  20 chars";
    //   }
    //   if (!phoneRejex.test(values.phone)) {
    //     errors.phone = "accept only egypt phone numbers";
    //   }
    //   if (!passwordRejex.test(values.password)) {
    //     errors.password =
    //       " password must start with upperCase then from 6 to more any chars ";
    //   }
    //   if (!emailRejex.test(values.email)) {
    //     errors.email =
    //       "Enter Valid Email ";
    //   }
    //   if (values.password !== values.rePassword) {
    //     errors.rePassword = "Password confirmation is incorrect";
    //   }
    //   console.log(errors);
    //   return errors;
    // },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("name is required")
        .min(3, "Name Should be more than or equal  3")
        .max(20, " Name Should be less than or equal  20 chars"),
      email: yup
        .string()
        .required("email is required")
        .email("Enter Valid Email"),
      phone: yup
        .string()
        .required("phone is required")
        .matches(/^01[0125][0-9]{8}$/, "accept only egypt phone numbers"),
      password: yup
        .string()
        .required("password is required")
        .matches(
          /^[A-Z][a-z0-9]{6,10}$/,
          "password must start with upperCase then from 6 to more any chars"
        ),
      rePassword: yup
        .string()
        .required("repassword is required")
        .oneOf([yup.ref("password")], "Password confirmation is incorrect"),
    }),
  });

  return (
    <section className="rounded-4 shadow  my-3 mx-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-none  d-lg-flex align-items-center justify-content-center flex-column  bg-dark text-white ">
            <h1 className="fw-bolder">Join our community, shop with us.</h1>
            <h6 className="fw-light pt-3 pb-1">Have an account? Login now.</h6>
            <button type="submit" className="btn btn-main">
              <Link className="btn btn-outline-light cursor-pointer" to={'/login'}>
                Login
              </Link>
            </button>
          </div>
          <div className="col-lg-8 col-12">
            <form onSubmit={registerGroup.handleSubmit} className="p-3">
              <h1 className="h2 my-2 text-center">Create Account</h1>
              <div className="my-2">
                <label htmlFor="name">name:</label>
                <input
                  value={registerGroup.values.name}
                  onChange={registerGroup.handleChange}
                  onBlur={registerGroup.handleBlur}
                  type="text"
                  id="name"
                  className="form-control p-2"
                />
                {registerGroup.errors.name && registerGroup.touched.name ? (
                  <div>
                    <div className="alert alert-danger">
                      {registerGroup.errors.name}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="my-2">
                <label htmlFor="name">email:</label>
                <input
                  value={registerGroup.values.email}
                  onChange={registerGroup.handleChange}
                  onBlur={registerGroup.handleBlur}
                  type="email"
                  id="email"
                  className="form-control p-2"
                />

                {registerGroup.errors.email && registerGroup.touched.email ? (
                  <div className="alert alert-danger">
                    {registerGroup.errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="my-2">
                <label htmlFor="password">Password:</label>
                <div className="d-flex align-items-center justify-content-end">
                  <input
                    id="password"
                    value={registerGroup.values.password}
                    onBlur={registerGroup.handleBlur}
                    onChange={registerGroup.handleChange}
                    type={IsClicedone?'text':'password'}
                    className="form-control p-2 position-relative"
                  />
                  <i onClick={Isclickeddone} className="far fa-eye eye-show position-absolute pe-5 fs-5 cursor-pointer"></i>

                </div>

                {registerGroup.errors.password &&
                registerGroup.touched.password ? (
                  <div className="alert alert-danger">
                    {registerGroup.errors.password}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="my-2">
                <label htmlFor="rePassword">rePassword:</label>
                <div className="d-flex align-items-center justify-content-end">
                  <input
                    id="rePassword"
                    value={registerGroup.values.rePassword}
                    onChange={registerGroup.handleChange}
                    onBlur={registerGroup.handleBlur}
                    type={Isclicked?'text':'password'}
                    className="form-control p-2 position-relative"
                  />
                  <i onClick={Isclickedd} className="far fa-eye eye-show position-absolute pe-5 fs-5 cursor-pointer"></i>
                </div>

                {registerGroup.errors.rePassword &&
                registerGroup.touched.rePassword ? (
                  <div className="alert alert-danger">
                    {registerGroup.errors.rePassword}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="my-2">
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  value={registerGroup.values.phone}
                  onChange={registerGroup.handleChange}
                  onBlur={registerGroup.handleBlur}
                  type="tel"
                  className="form-control p-2"
                />

                {registerGroup.errors.phone && registerGroup.touched.phone ? (
                  <div className="alert alert-danger">
                    {registerGroup.errors.phone}
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
              {mesageTrue ? (
                <div className="alert alert-success w-100 text-center mt-2">
                  Account Createed successfuly
                </div>
              ) : (
                ""
              )}
              {mesageFalse ? (
                <div className="alert alert-danger w-100 text-center mt-2">
                  {mesageFalse}
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
