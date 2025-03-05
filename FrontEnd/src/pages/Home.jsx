import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [bestpackage, setBestpackage] = useState([]);
  const[visaFree,setVisaFree] = useState([]);
  const[internationalTrip,setInternationalTrip] = useState([]);

  
  const fetchApi1 = async () => {
    const query = `
  query{
  bestPackage{
  id
  location
  image
  }
  }
  `;
    const response = await axios.post("http://localhost:3000/graphql", {
      query,
    });
    setBestpackage(response.data.data.bestPackage);
    //console.log("321")
  };
  const fetchApi2 = async () => {
    const query = `
  query{
  visaFree{
  id
  location
  image
  }
  }
  `;
    const response = await axios.post("http://localhost:3000/graphql", {
      query,
    });
    setVisaFree(response.data.data.visaFree);
    //console.log("321")
  };
  const fetchApi3 = async () => {
    const query = `
  query{
  internationalTrip{
  id
  location
  image
  }
  }
  `;
    const response = await axios.post("http://localhost:3000/graphql", {
      query,
    });
    setInternationalTrip(response.data.data.internationalTrip);
    //console.log("321")
  };
  useEffect(() => {
    fetchApi1();
    fetchApi2();
    fetchApi3();
  }, []);
  return (
    <>
      <div className="home-outer-con">
        <div className="package-outer-con">
          <h1>BEST PACKAGES</h1>
          <div className="package-con">
            {bestpackage.map((card) => (
              <div className="package-card" >
                <img src={card.image} alt={card.location} />
                <p>{card.location}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="package-outer-con">
          <h1>VISA FREE DESTINATIONS</h1>
          <div className="package-con">
            {visaFree.map((card) => (
              <div className="package-card">
                <img src={card.image} alt={card.location} />
                <p>{card.location}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="package-outer-con">
          <h1>VISA FREE DESTINATIONS</h1>
          <div className="package-con">
            {internationalTrip.map((card) => (
              <div className="package-card">
                <img src={card.image} alt={card.location} />
                <p>{card.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;