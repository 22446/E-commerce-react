import React from 'react'
import {Navigate} from 'react-router-dom'

export default function Protectedpathauth({children}) {
    if(localStorage.getItem('userToken')!==null){
        return <Navigate to='/'/>
    }
  return <>{children}</>

}
