import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));


useEffect(()=>{
    if(localStorage.getItem('role')) {
        setRole(localStorage.getItem('role'));
      }
},[])
  return (
    <AuthContext.Provider 
      value={{ role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}



export const useAuth = () => useContext(AuthContext); //custom hook
