import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RestrictedRoute = ({children}) => {
     const navigate  = useNavigate();
     const userName = JSON.parse(localStorage.getItem("userData"))?.name;

     useEffect(()=>{
        if(userName!=null){
            navigate("/home")
        }
     })
  return children
}

export default RestrictedRoute