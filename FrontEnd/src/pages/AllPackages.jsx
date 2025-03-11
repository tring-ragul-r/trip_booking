import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllPackages.css";
import { useNavigate } from "react-router-dom";

const AllPackages = () => {
  const [allPackages, setAllPackages] = useState([]);
  const navigate = useNavigate();
  const fetchPackage = async () => {
    const query = `
    query{
      allPackages{
          packageid
          package_img
          title
          days
          description
          price
          location
        }
      }
    `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });
      if (response.data.data.allPackages) {
        setAllPackages(response.data.data.allPackages);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchPackage();
  }, []);
  const handlePackage = (data)=>{
    navigate('/bookpackage',{state:{package:data}})
  }
  return (
    <div className="all-packages-outer-container">
      <h1 className="all-packages-title">All Packages</h1>
      <div className="all-packages-container">
        {allPackages.map((data)=>(
          <div className="package-card" onClick={()=>{handlePackage(data)}}>
            <img src={data?.package_img} alt={data?.location} className="package-card-img" />
            <div className="package-card-title-con">
              <h2 className="package-card-title">{data?.title}</h2>
              <span>{data?.days}</span>
            </div>
            <p className="pacakge-card-desc">{data?.description}</p>
            <div className="package-card-btn">
              <button>
                ₹{data?.price}
                <span> / person</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
