import React from 'react'
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { Offline } from "react-detect-offline"
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import {Toaster} from 'react-hot-toast';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Protectedroute from './Components/Protectedroute/Protectedroute';
import Protectedpathauth from './Components/Protectedroute/Protectedpathauth';
import Product from './Components/Product/Product';
import {QueryClientProvider,QueryClient} from 'react-query'
import Brands from './Components/Brands/Brands';
import Categories from './Components/Category/Categories';
import Productdetials from './Components/ProductDetails/Productdetials';
import Addtocart, { AddtoCartContext } from './Contexts/AddtoCardContext';
import Cart from './cart/Cart';
import Payment from './Components/Payment/Payment';
import AddTowishListcontext from './Contexts/AddTowishListcontext';
import Wishlist from './Components/Wishlist/Wishlist';
import Categorydetails from './Components/Categorydetails/Categorydetails';
import Branddetails from './Components/Branddetails/Branddetails';
import AuthContext from './Contexts/AuthContext';

export default function App() {

  const router = createHashRouter([
    {path:'',element:<Layout/>,children:[
      {path:'',element:<Protectedroute>
        <Home/>
      </Protectedroute>},
      {path:'products',element:<Protectedroute>
        <Product/>
      </Protectedroute>},
      {path:'brands',element:<Protectedroute>
        <Brands/>
      </Protectedroute>},
      {path:'cart',element:<Protectedroute>
        <Cart/>
      </Protectedroute>},
      {path:'payment',element:<Protectedroute>
        <Payment/>
      </Protectedroute>},
      {path:'categorydetails/:id',element:<Protectedroute>
        <Categorydetails/>
      </Protectedroute>},
       {path:'branddetails/:id',element:<Protectedroute>
        <Branddetails/>
      </Protectedroute>},
        {path:'categories',element:<Protectedroute>
          <Categories/>
        </Protectedroute>},
         {path:'wishlist',element:<Protectedroute>
          <Wishlist/>
        </Protectedroute>},
        
         {path:'productdetails/:id',element:<Protectedroute>
          <Productdetials/>
        </Protectedroute>},
      {path:'login',element:<Protectedpathauth>
        <Login/>
      </Protectedpathauth>},
      {path:'register',element:<Protectedpathauth>
        <Register/>
        </Protectedpathauth>},
    ]}
  ])
  const queryclient=new QueryClient()
  return (
    <>
    <AuthContext>
      <QueryClientProvider client={queryclient}>
        <Addtocart>
        <AddTowishListcontext>
      <RouterProvider router={router}/>
      <Toaster />
      </AddTowishListcontext>
      </Addtocart>
      </QueryClientProvider>
      </AuthContext>
      <Offline>
        <div className='rouded text-white text-center bg-dark p-5 rounded w-100 position-fixed top-0'>
        <h1>  You're offline right now. Check your connection.</h1>
          </div>
      </Offline>
    </>
  )
}
