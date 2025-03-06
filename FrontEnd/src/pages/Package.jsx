import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./package.css";

const Package = () => {
  const { location } = useParams();
  const [packageData, setPackageData] = useState();
  const [arrPackages, setArrPackages] = useState([]);
  //console.log(packageData);
  console.log(arrPackages);

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
      // console.log(response.data.data.packageByLocation)
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
      // console.log(response.data.data.packageByLocation)
      setArrPackages(response.data.data.packageByLocationId);
    } catch (err) {}
  };

  useEffect(() => {
    fetchByLocation();
    fetchPackagesById();
  }, [location]);
  return (
    <div className="package-outer-con">
      <div className="cover-img-con">
        <img src={packageData?.cover_img} alt={packageData?.location} />
        <div className="img-background">
          <p className="location">{packageData?.location} Packages</p>
          <p className="quote">{packageData?.quote}</p>
        </div>
      </div>
      <div>
        <div className="package-container-body">
          <div className="package-inner-body">
            <div className="package-header">Packages</div>
            <hr />
            <div className="package-card-body">
              {arrPackages.map((data) => (
                <div className="package-card">
                  <img
                    src={data?.package_img}
                    alt={data?.location}
                  />
                  <div className="package-card-title-con">
                    <p className="package-card-title">
                    {data?.title}
                    </p>
                    <span>{data?.days}</span>
                  </div>
                  <p className="pacakge-card-desc">
                  {data?.description}
                  </p>
                  <div className="package-card-btn">
                    <button>₹{data?.price}</button>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
