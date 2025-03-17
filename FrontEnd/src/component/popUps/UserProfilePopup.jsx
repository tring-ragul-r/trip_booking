import React, { useEffect, useState } from "react";
import "./UserProfilePopup.css";
import profileImg from "../../assets/user_profile_img.png";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfilePopup = ({ closePopup }) => {
  const [editing, setEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchUserData = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const query = `
      query {
        getUserDataById(id: ${userData?.id}) {
          name
          email
          phonenumber
        }
      }
    `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });
      setUserDetails(response.data.data.getUserDataById);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  console.log(userDetails);

  const onSubmit = async (data) => {
    console.log("Updated Form Data:", data);

    const query = `
        mutation{
          updateProfileById(email:"${data?.email}",phonenumber:"${data?.phonenumber}",id:${userData?.id})
        }
      `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });

      //console.log(response.data.data.updateProfileById);
      if(response.data.data.updateProfileById=="Profile updated successfully"){
        
        setUserDetails((prev) => ({ ...prev, ...data }));
        toast.success("Profile updated successfully");
      }
      else if(response.data.data.updateProfileById=="Email already exist"){
        toast.error('Email already exist');
        return;
      }
      
    } catch (err) {}
    setEditing(false);
  };
 
  if (!userDetails) {
    return <div>Loading</div>;
  }

  return (
    <div className="user-profile-popup-container">
      <div className="user-profile-popup-content">
        <h2 className="user-profile-popup-header">User Profile</h2>
        <div className="user-profile-popup-body">
          <img
            src={profileImg}
            alt="Profile"
            className="user-profile-popup-image"
          />
          <div className="user-profile-popup-form-container">
            {!editing ? (
              <div className="user-profile-details">
                <div className="detail-item">
                  <p>
                    <b>Name: </b>
                    {userDetails?.name}
                  </p>
                </div>
                <div className="detail-item">
                  <p>
                    <b>Email: </b>
                    {userDetails?.email}
                  </p>
                </div>
                <div className="detail-item">
                  <p>
                    <b>Phone Number: </b>
                    {userDetails?.phonenumber}
                  </p>
                </div>
                <button
                  className="edit-profile-button"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="edit-user-profile-container">
                <form
                  className="edit-user-profile-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                      <input
                        type="email"
                        placeholder="Email"
                        defaultValue={userDetails.email}
                        {...register("email", {
                          required: "Email required",
                          pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: "Invalid email format",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="error">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-wrapper">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        defaultValue={userDetails.phonenumber}
                        {...register("phonenumber", {
                          required: "Phone number required",
                          maxLength: {
                            value: 10,
                            message: "Phone number should not exceed 10 digits",
                          },
                          minLength: {
                            value: 10,
                            message: "Phone number should be exactly 10 digits",
                          },
                          pattern: {
                            value: /^\d{10}$/,
                            message: "Phone number should contain numbers only",
                          },
                        })}
                      />
                    </div>
                    {errors.phonenumber && (
                      <p className="error">{errors.phonenumber.message}</p>
                    )}
                  </div>
                  <button type="submit" className="save-changes-button">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-edit-button"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <button className="close-popup-button" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
