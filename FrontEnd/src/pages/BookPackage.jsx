import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./bookPackage.css";
import { toast } from "react-toastify";
import BookingPackages from "../component/popUps/BookingPackagePopup";

export const Booking = async (packageDetials) => {
  const booking_date = packageDetials?.booking_date;
  const userid = packageDetials?.userid;
  const packageid = packageDetials?.packageid;
  const email = packageDetials?.email;
  const query = `
  mutation {
    insertBooking(packageid: ${packageid}, booking_date: "${booking_date}", count: ${packageDetials.count}, total_price: ${packageDetials.totalPrice}, userid: ${userid}, email: "${email}")
  }
  `;

  try {
    const response = await axios.post("http://localhost:3000/graphql", {
      query,
    });
    if (response.data.data) {
     
    }
  } catch (error) {
    console.error("Error inserting booking:", error);
  }
};

function BookPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state?.package;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageData?.price);
  const [selectedDate, setSelectedDate] = useState("");
  const [popup, setPopup] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const bookingDetails = {
    userid: userData?.id,
    totalPrice,
    booking_date: selectedDate,
    count,
    email: userData?.email,
    packageid: packageData?.packageid,
  };

  const today = new Date();
  today.setDate(today.getDate() + 4);
  const minDate = today.toISOString().split("T")[0];

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  const maxDateString = maxDate.toISOString().split("T")[0];

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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Select a date to book");
      return;
    }
    setPopup(true);
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
              &#128198; Selected Date: {selectedDate}
            </p>
          )}
          <p className="package-description">{packageData?.description}</p>
          <div className="package-add-person-container">
            <p className="package-add-person-title">Add person</p>
          <div className="add-person-button-container">
            <button onClick={handleDropBtn}>-</button>
            <p>{count}</p>
            <button onClick={handleAddBtn}>+</button>
          </div>
          </div>
          <div className="date-picker-container">
            <label htmlFor="date-picker" className="date-label">
              Select Booking Date:
            </label>
            <input
              id="date-picker"
              type="date"
              min={minDate}
              max={maxDateString}
              value={selectedDate}
              onChange={handleDateChange}
              className="date-input"
            />
          </div>
          <h2 className="total-price">Total Price: ₹{totalPrice}</h2>
          <button className="book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
      {popup && (
        <BookingPackages setPopup={setPopup} packageDetials={bookingDetails} />
      )}
    </div>
  );
}

export default BookPackage;
