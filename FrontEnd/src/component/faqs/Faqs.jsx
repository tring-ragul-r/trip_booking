import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdFreeCancellation } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { RiRefund2Line } from "react-icons/ri";
import { MdModeOfTravel } from "react-icons/md";
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
          <FaPaperPlane className="faq-logo" />
          <h2 className="faq-content-title">
            How to book trip with TringTrip?
          </h2>
          <p>
            To book a trip with TringTrip, explore a wide range of packages,
            including Best Packages, Visa-Free Destinations, and International
            Trips. Once you find your desired package, click "Book Now" to
            proceed. Customize your booking by selecting the number of travelers
            and your preferred travel date using the calendar. Confirm the total
            price and complete your booking with ease! TringTrip ensures a
            seamless experience, helping you plan your dream vacation
            hassle-free and create unforgettable memories.
          </p>
        </div>
        <div>
          <LiaUserEditSolid className="faq-logo" />
          <h2 className="faq-content-title">
            How can I edit my profile on TringTrip?
          </h2>
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
          <h2 className="faq-content-title">
            How to cancel trip with TringTring
          </h2>
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
          <h2 className="faq-content-title">
            How can I update Trip with TringTring?
          </h2>
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
        <div>
          <RiRefund2Line className="faq-logo" />
          <h2 className="faq-content-title">Instant Refunds with TringTrip</h2>
          <p>
            TringTrip offers an instant refund policy for eligible
            cancellations, ensuring a hassle-free experience. If you cancel your
            booking within the allowed time frame (at least 3 days before the
            travel date), your refund will be processed immediately. Enjoy peace
            of mind with TringTrip's commitment to providing quick and reliable
            service for your travel needs.
          </p>
        </div>
        <div>
          <MdModeOfTravel className="faq-logo" />
          <h2 className="faq-content-title">
            Is there a guide available for trips?
          </h2>
          <p>
            TringTrip offers professional guides for select travel packages to
            make your journey more enriching. These guides provide expert
            knowledge, local insights, and assistance during your trip, ensuring
            you have a seamless and memorable experience. From historical
            landmarks to cultural explorations, our guides enhance your travel
            by helping you discover the best of each destination.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
