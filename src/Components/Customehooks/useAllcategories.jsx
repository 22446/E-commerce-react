import axios from 'axios'
import { useQuery } from 'react-query'

export default function useAllcategories() {
    function GetALLcATEGORIES(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const res= useQuery({
    queryKey:'GetAllcategory',
    queryFn:GetALLcATEGORIES
    })
    
  return res
}
