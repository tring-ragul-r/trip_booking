import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
const Routers = () => {
  return (
    <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/home" element={<Home/>}/>
    	<Route path = "/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
    </Routes>
  )
}

export default Routers