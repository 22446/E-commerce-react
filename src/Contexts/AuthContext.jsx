import React, { createContext, useState } from 'react'
export  const authcontext=createContext()

export default function AuthContext({children}) {
    const [token, settoken] = useState(localStorage.getItem('userToken'))

    
    
    return (
    
    <authcontext.Provider value={{token , settoken}}>{children}</authcontext.Provider>
  )
}
