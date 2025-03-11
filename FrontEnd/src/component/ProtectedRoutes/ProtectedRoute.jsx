import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem("userData"))?.name;
    console.log(userName);
    
    useEffect(()=>{
        if(userName==null){
            navigate("/signin");
        }
    })
  return children
}

export default ProtectedRoute