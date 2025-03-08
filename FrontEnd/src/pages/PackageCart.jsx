import React from "react";
import "./PackageCart.css";
import NoPackage from '../assets/notFound.png';

const PackageCart = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

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
      {bookings.map((booking, index) => (
        <div key={index} className="booking-card">
          <img
            src={booking.packageData.package_img}
            alt={booking.packageData.title}
            className="booking-image"
          />
          <h1>{booking.packageData.title}</h1>
          <p>
            <strong>Location:</strong> {booking.packageData.location}
          </p>
          <p>
            <strong>Price per person:</strong> ₹{booking.packageData.price}
          </p>
          <p>
            <strong>Duration:</strong> {booking.packageData.days}
          </p>
          <p>
            <strong>Description:</strong> {booking.packageData.description}
          </p>
          <p>
            <strong>Number of persons:</strong> {booking.count}
          </p>
          <h2>Total Price: ₹{booking.totalPrice}</h2>
        </div>
      ))}
    </div>
  );
};

export default PackageCart;
