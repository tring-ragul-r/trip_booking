import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PackageCart.css";
import NoPackage from "../assets/notFound.png";

const PackageCart = () => {
  const [bookings, setBookings] = useState([]);

  const userid = JSON.parse(localStorage.getItem("userData"))?.id;
  const fetchBooking = async () => {
    const query = `
    query {
      getBookingByUser(userId: ${userid}) {
        packageid
        booking_date
        count
        total_price
        userid
        package_img
        title
        days
        description
        price
        location
      }
    }
`;
    const response = await axios.post("http://localhost:3000/graphql", {
      query,
    });
    setBookings(response.data.data.getBookingByUser);
  };

  useEffect(() => {
    fetchBooking();
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <div className="no-package-container">
        <img src={NoPackage} alt="No Package" className="no-package-image" />
        <p className="no-package-message">No upcoming Travel</p>
      </div>
    );
  }

  return (
    <div className="package-cart-container">
      {bookings.map((booking) => (
        <div className="booking-card">
          <img
            src={booking.package_img}
            alt={booking.title}
            className="booking-image"
          />
          <div className="booking-details">
            <h1>{booking.title}</h1>
            <p>
              <b>Location:</b> {booking.location}
            </p>
            <p>
              <b>Price per person:</b> ₹{booking.price}
            </p>
            <p>
              <b>Duration:</b> {booking.days}
            </p>
            <p>
              <b>Description:</b> {booking.description}
            </p>
            <p>
              <b>Number of persons:</b> {booking.count}
            </p>
            <p>
              <b>Date of Travel:</b> {booking.booking_date}
            </p>
            <h2>Total Price: ₹{booking.total_price}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackageCart;
