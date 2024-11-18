import axios from "axios";
import React, { createContext } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
export const wishtListContext = createContext();
export default function AddTowishListcontext({ children }) {
  const query = useQueryClient();
  async function AddProductTowishList(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token: localStorage.getItem("userToken") } }
      )
      .then(function (res) {
        
        query.invalidateQueries("allWishList");
        return true;
      })
      .catch(function (err) {
       
        return false;
      });
  }
  async function removeFromWishList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then(function (res) {
        
        query.invalidateQueries("allWishList");
        return true;
      })
      .catch(function (err) {
       
        return false;
      });
  }
  function GetallWishListProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: localStorage.getItem("userToken") },
    });
  }
  const { data, isLoading } = useQuery({
    queryKey: "allWishList",
    queryFn: GetallWishListProduct,
  });

  return (
    <wishtListContext.Provider
      value={{ AddProductTowishList, data, isLoading, removeFromWishList }}
    >
      {children}
    </wishtListContext.Provider>
  );
}
