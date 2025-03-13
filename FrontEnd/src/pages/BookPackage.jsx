
import { use, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./bookPackage.css";
import { toast } from "react-toastify";
import BookingPackages from "../popUps/BookingPackages";
export const Booking = async (packageDetials)=>{
  console.log(packageDetials);
  
  
  const booking_date = packageDetials?.booking_date
  ? `${packageDetials?.booking_date.getDate()}-${  (packageDetials?.booking_date.getMonth() + 1)}-${ packageDetials?.booking_date.getFullYear()}`
  : "";

const userid = packageDetials?.userid;
const packageid = packageDetials?.packageid;
const email = packageDetials?.email;
const query = `
  mutation{
insertBooking(packageid: ${packageid}, booking_date: "${booking_date}", count: ${packageDetials.count}, total_price: ${packageDetials.totalPrice}, userid: ${userid}, email: "${email}")
}

`;

try {
  const response = await axios.post("http://localhost:3000/graphql", {
    query,
  });
   if(response.data.data){
    toast.success("package Booked successfully")
   }
} catch (error) {
  console.error("Error inserting booking:", error);
}
}

function BookPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state?.package;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageData?.price);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popup,setPopup] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"))
  let bookingDetails = {
    userid:userData?.id,
    totalPrice,
    booking_date:selectedDate,
    count,
    email:userData?.email,
    packageid:packageData?.packageid
  }

  const today = new Date();
  const tillDate = new Date();
  tillDate.setMonth(today.getMonth() + 2);

  const handleAddBtn = () => {
    if (count < 6) {
      const newCount = count + 1;
      setCount(newCount);
      setTotalPrice(packageData?.price * newCount);
    }
  };

  const handleDropBtn = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      setTotalPrice(packageData?.price * newCount);
    }
  };

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleBookNow =  () => {

    if(!selectedDate){
      toast.error("select the Date to book")
      return;
    }

    bookingDetails = {
      booking_date:selectedDate,
      totalPrice,
      count:count
    }


    setPopup(true)
    
  };

  return (
    <div className="book-package-container">
      <div className="book-package-card">
        <div className="package-image-con">
          <img
            src={packageData?.package_img}
            alt={packageData?.title}
            className="package-image"
          />
        </div>
        <div className="package-detail-con">
          <h1 className="title">Book Your Package</h1>
          <h2 className="package-title">{packageData?.title}</h2>
          <p className="package-location">
            &#x1F4CD; Location: {packageData?.location}
          </p>
          <p className="package-price">
            &#128176; Price: <span>₹{packageData?.price} / person</span>
          </p>
          <p className="package-duration">
            &#128338; Duration: {packageData?.days}
          </p>
          {selectedDate && (
              <p className="selected-date">
               &#128198; Selected Date: {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
              </p>
            )}
          <p className="package-description">{packageData?.description}</p>
          
          <div className="add-person-con">
            <button onClick={handleDropBtn}>-</button>
            <p>{count}</p>
            <button onClick={handleAddBtn}>+</button>
          </div>
          <div className="calendar-toggle-container">
            <button className="toggle-calendar-btn" onClick={handleShowCalendar}>
              {showCalendar ? "Hide Calendar" : "Book Your Date"}
            </button>
            {showCalendar && (
              <div className="calendar-container">
                <Calendar
                  minDate={today}
                  maxDate={tillDate}
                  onClickDay={handleDateSelect}
                />
              </div>
            )}
            
          </div>
          <h2 className="total-price">Total Price: ₹{totalPrice}</h2>
          <button className="book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
      {popup && <BookingPackages setPopup={setPopup} packageDetials = {bookingDetails} />}
      
    </div>
  );
}

export default BookPackage;
