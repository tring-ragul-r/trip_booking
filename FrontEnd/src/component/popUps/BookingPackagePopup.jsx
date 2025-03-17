import React from "react";
import "./BookingPackagePopup.css";
import { Booking } from "../../pages/BookPackage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingPackages = ({setPopup,packageDetials}) => {
  const navigate = useNavigate();
  const handleBook = ()=>{
    Booking(packageDetials);
    setPopup(false);
    toast.success("Package booked successfully");

    navigate('/home')
    
  }
  const handleCancel=()=>{
      setPopup(false)
  }

  return (
    <div className="booking-popup">
      <div className="booking-popup-outer-con">
        <div className="booking-pop-con">
          <p className="booking-popup-title">Confirm to Book</p>
          <div className="booking-popup-btns">
            <button className="booking-popup-book-btn" onClick={()=>handleBook()}>Book</button>
            <button className="booking-popup-cancel-btn" onClick={()=>handleCancel()} >cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPackages;
