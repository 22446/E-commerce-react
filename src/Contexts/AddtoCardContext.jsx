import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

export const AddtoCartContext= createContext()
export default function Addtocart({children}) {
    const queryClient = useQueryClient()

    const [AllProduct,setAllproductss]=useState(null)
    
    async function addProductToCart(productId){
      return  axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
            productId
        },{
            headers:{token:localStorage.getItem('userToken')}
        }).then(function(res){
           
            queryClient.invalidateQueries('getcart')
            console.log(res)
            return true
        }).catch(function(err){
            console.log(err)
            return false
        })
    }
    async function updateCartCount(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {count},{headers:{token:localStorage.getItem('userToken')}}
        ).then(function(res){
            queryClient.invalidateQueries('getcart')
            console.log(res)
            return true
        }).catch(function(err){
            console.log(err)
            return false
        })
    }
    async function deleteSpecificItem(id){
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {headers:{token:localStorage.getItem('userToken')}}
        ).then(function(res){
            queryClient.invalidateQueries('getcart')
            console.log(res)
            return true
        }).catch(function(err){
            console.log(err)
            return false
        })
    }
  async  function DeleteAllItems() 
    {return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers:{token:localStorage.getItem('userToken')}}
    ).then(function(res){
        queryClient.invalidateQueries('getcart')
        console.log(res)
        return true
    }).catch(function(err){
        console.log(err)
        return false
    })
}
   function getAllProducts(){
       return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{token:localStorage.getItem('userToken')}})
    }
    const {data,isLoading}= useQuery({
       queryKey:"getcart",
       queryFn: getAllProducts,
       
    })
  return (
    <AddtoCartContext.Provider value={{addProductToCart,getAllProducts,deleteSpecificItem,DeleteAllItems,data,isLoading,AllProduct,updateCartCount}}>
        {children}
    </AddtoCartContext.Provider>
  )
}
