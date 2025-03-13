import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdFreeCancellation } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

import "./Faqs.css";
const Faqs = () => {
  return (
    <div className="faq-outer-container">
      <div className="faq-header-container">
        <p>FAQs</p>
        <p className="faq-header-title">Ask us anything</p>
        <p>Have any questions? We're here to assist you.</p>
      </div>
      <div className="faq-content-body">
        <div>
          <FaPaperPlane className="faq-logo"/>
          <h2>How to book trip with TripTrip?</h2>
          <p>
            To book a trip with TringTrip, simply explore the wide range of
            packages available, including Best Packages, Visa-Free Destinations,
            and International Trips. Once you find your desired package, click
            on the "Book Now" button to proceed. You can customize your booking
            by selecting the number of travelers and choosing your preferred
            travel date using the calendar feature. After confirming the total
            price, complete your booking with just a click! TringTrip ensures a
            seamless experience, allowing you to plan your dream vacation
            hassle-free. Start your journey today and make unforgettable
            memories with TringTrip!
          </p>
        </div>
        <div>
          <LiaUserEditSolid className="faq-logo"/>
          <h2>How can I edit my profile on TringTrip?</h2>
          <p>
            Editing your profile on TringTrip is simple and user-friendly. Click
            on your profile name in the header to open the profile menu. Select
            the "Profile" option to navigate to the Edit Profile page. From
            there, you can update your name, contact information, and other
            details. To change your password, go to the Change Password section,
            enter your current password and new password, then click "Save
            Changes" to update it securely. TringTrip makes managing your
            profile quick and secure!
          </p>
        </div>
        <div>
          <MdFreeCancellation className="faq-logo" />
          <h2>How to cancel trip with TringTring</h2>
          <p>
            To cancel a trip with TringTring, visit your PackageCart and locate
            the trip you wish to cancel. Click on the Cancel button, and a
            confirmation popup will appear. Please note that cancellations must
            be made at least 3 days before the travel date. If your trip is
            scheduled within the next 3 days, it cannot be canceled. Confirm
            your cancellation in the popup if your trip meets the policy
            requirements. Plan ahead to avoid last-minute inconveniences!
          </p>
        </div>

        <div>
          <GrUpdate className="faq-logo" />
          <h2>How can I update Trip with TringTring?</h2>
          <p>
            To update your travel details, go to your PackageCart and find the
            trip you want to modify. Click on the Update button, and a form will
            appear for you to make changes to your travel details. Please ensure
            that updates are made at least 7 days before the travel date. If
            your trip is scheduled within the next 7 days, updates will not be
            allowed. Make sure to review your travel plans early to avoid any
            inconvenience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
