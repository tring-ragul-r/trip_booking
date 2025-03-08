import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./package.css";

const Package = () => {
  const { location } = useParams();
  const [packageData, setPackageData] = useState();
  const [arrPackages, setArrPackages] = useState([]);
const navigate = useNavigate();
  const fetchByLocation = async () => {
    const query = `
    query{
        packageByLocation(location:"${location}")
        {
          location
          cover_img
          quote
        }
      }
    `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", {
        query,
      });
      setPackageData(response.data.data.packageByLocation);
    } catch (err) {}
  };

  const fetchPackagesById = async () => {
    const query = `
    query{
        packageByLocationId(location:"${location}")
        {
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
      setArrPackages(response.data.data.packageByLocationId);
    } catch (err) {}
  };

  useEffect(() => {
    fetchByLocation();
    fetchPackagesById();
  }, [location]);
  const handlePackage = (data)=>{
    navigate('/bookpackage',{state:{package:data}})
  }

  return (
    <div className="package-outer-con">
      <div className="cover-img-con">
        <img src={packageData?.cover_img} alt={packageData?.location} />
        <div className="img-background">
          <p className="location">{packageData?.location} Packages</p>
          <p className="quote">{packageData?.quote}</p>
        </div>
      </div>
      <div className="package-container-body">
        <div className="package-inner-body">
          <h1 className="package-header">Packages</h1>
          <hr />
          <div className="package-card-body">
            {arrPackages.map((data) => (
              <div  className="package-card" onClick={()=>{handlePackage(data)}} >
                <img
                  src={data?.package_img}
                  alt={data?.location}
                  className="package-card-img"
                />
                <div className="package-card-title-con">
                  <h2 className="package-card-title">{data?.title}</h2>
                  <span >{data?.days}</span>
                </div>
                <p className="pacakge-card-desc">{data?.description}</p>
                <div className="package-card-btn">
                  <button >₹{data?.price}<span> / person</span></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
