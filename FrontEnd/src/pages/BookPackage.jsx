// import { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./bookPackage.css";

// function BookPackage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const packageData = location.state?.package;
//   const [count, setCount] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(packageData?.price);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const today = new Date();
//   const tillDate = new Date();
//   tillDate.setMonth(today.getMonth() + 2);

//   const handleAddBtn = () => {
//     if (count < 6) {
//       const newCount = count + 1;
//       setCount(newCount);
//       setTotalPrice(packageData?.price * newCount);
//     }
//   };

//   const handleDropBtn = () => {
//     if (count > 1) {
//       const newCount = count - 1;
//       setCount(newCount);
//       setTotalPrice(packageData?.price * newCount);
//     }
//   };

//   const handleShowCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     setShowCalendar(false);
//   };

//   const handleBookNow = () => {
//     const booking = {
//       packageData,
//       count,
//       totalPrice,
//       selectedDate: selectedDate
//         ? {
//             day: selectedDate.getDate(),
//             month: selectedDate.getMonth() + 1,
//             year: selectedDate.getFullYear(),
//           }
//         : null,
//     };
//     const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
//     existingBookings.push(booking);
//     localStorage.setItem("bookings", JSON.stringify(existingBookings));
//     navigate("/cart");
//   };

//   return (
//     <div className="book-package-container">
//       <div className="book-package-card">
//         <div className="package-image-con">
//           <img
//             src={packageData?.package_img}
//             alt={packageData?.title}
//             className="package-image"
//           />
//         </div>
//         <div className="package-detail-con">
//           <h1 className="title">Book Your Package</h1>
//           <h2 className="package-title">{packageData?.title}</h2>
//           <p className="package-location">
//             &#x1F4CD; Location: {packageData?.location}
//           </p>
//           <p className="package-price">
//             &#128176; Price: <span>₹{packageData?.price} / person</span>
//           </p>
//           <p className="package-duration">
//             &#128338; Duration: {packageData?.days}
//           </p>
//           <p className="package-description">{packageData?.description}</p>
//           <div className="add-person-con">
//             <button onClick={handleDropBtn}>-</button>
//             <p>{count}</p>
//             <button onClick={handleAddBtn}>+</button>
//           </div>
//           <div className="calendar-toggle-container">
//             <button className="toggle-calendar-btn" onClick={handleShowCalendar}>
//               {showCalendar ? "Hide Calendar" : "Book Your Date"}
//             </button>
//             {showCalendar && (
//               <div className="calendar-container">
//                 <Calendar
//                   minDate={today}
//                   maxDate={tillDate}
//                   onClickDay={handleDateSelect}
//                 />
//               </div>
//             )}
//             {selectedDate && (
//               <p className="selected-date">
//                 Selected Date: {selectedDate.getDate()}/
//                 {selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
//               </p>
//             )}
//           </div>
//           <h2 className="total-price">Total Price: ₹{totalPrice}</h2>
//           <button className="book-btn" onClick={handleBookNow}>
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookPackage;
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./bookPackage.css";

function BookPackage() {
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state?.package;
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(packageData?.price);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleBookNow = async () => {
    // Format the date as "YYYY-MM-DD" or an empty string if no date is selected.
    const booking_date = selectedDate
      ? `${selectedDate.getFullYear()}-${  (selectedDate.getMonth() + 1)}-${ selectedDate.getDate()}`
      : "";
  
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData?.id;
    const packageid = packageData?.packageid; // Ensure this matches your package object property
  
    if (!packageid || !userid) {
      console.error("Missing package id or user id:", packageid, userid);
      return;
    }
  
    // Prepare the variables for the mutation.
    
  
    // Define the GraphQL mutation query using variables.
    const query = `
      mutation{
  insertBooking(packageid: ${packageid}, booking_date: "${booking_date}", count: ${count}, total_price: ${totalPrice}, userid: ${userid})
}

    `;
  
    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });
      console.log("Booking inserted successfully:", response.data);
      navigate("/cart");
    } catch (error) {
      console.error("Error inserting booking:", error);
    }
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
            {selectedDate && (
              <p className="selected-date">
                Selected Date: {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
              </p>
            )}
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
