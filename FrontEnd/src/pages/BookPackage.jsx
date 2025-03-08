
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import "./bookPackage.css";

function BookPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state?.package;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageData?.price);

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

  const handleBookNow = () => {
    const booking = { packageData, count, totalPrice };
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));
    navigate("/cart");
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
          <h1 className="package-title">Book Your Package</h1>
          <h2 className="package-subtitle">{packageData?.title}</h2>
          <p className="package-location">
            &#x1F4CD; Location: {packageData?.location}
          </p>
          <p className="package-price">
            &#128176; Price: <span>₹{packageData?.price} / person</span>
          </p>
          <p className="package-duration">
            &#128338; Duration: {packageData?.days}
          </p>
          <p className="package-description">{packageData?.description}</p>
          <div className="add-person-con">
            <button onClick={handleDropBtn}>-</button>
            <p>{count}</p>
            <button onClick={handleAddBtn}>+</button>
          </div>
          <div className="calendar-container">
            <h3>Select Your Dates:</h3>
            <Calendar minDate={today} maxDate={tillDate} />
          </div>
          <h2 className="total-price">Total Price: ₹{totalPrice}</h2>
          <button className="book-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookPackage;
