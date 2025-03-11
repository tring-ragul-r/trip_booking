import React from 'react'
import LandlingImg from '../assets/landlingPage.jpg'
import './LandlingPage.css'
const LandlingPage = () => {
  return (
    <div className='land-page-con'>
        <img src={LandlingImg} alt="" />
        <div className='landing-content-con'>
            <span className='land-content-time'>It's Time To</span>
            <p className='land-content-travel'>Travel</p>
            <p className='land-content-title'>EXPLORE</p>
            <p>the world</p>

        </div>
    </div>
  )
}

export default LandlingPage