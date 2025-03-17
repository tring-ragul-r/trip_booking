import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Faqs from "../component/faqs/Faqs";

const Home = () => {
  const [bestpackage, setBestpackage] = useState([]);
  const [visaFree, setVisaFree] = useState([]);
  const [internationalTrip, setInternationalTrip] = useState([]);
const [slidePackages, setSlidePackages] = useState([]);
  const navigate = useNavigate();


  const fetchBestPackage = async () => {
    const query = `
      query {
        bestPackage {
          id
          location
          image
        }
      }
    `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", { query });
      setBestpackage(response.data.data.bestPackage);
    } catch (error) {
      console.error("Error fetching best packages:", error);
    }
  };


  const fetchVisaFree = async () => {
    const query = `
      query {
        visaFree {
          id
          location
          image
        }
      }
    `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", { query });
      setVisaFree(response.data.data.visaFree);
    } catch (error) {
      console.error("Error fetching visa-free packages:", error);
    }
  };

 
  const fetchInternationalTrip = async () => {
    const query = `
      query {
        internationalTrip {
          id
          location
          image
        }
      }
    `;
    try {
      const response = await axios.post("http://localhost:3000/graphql", { query });
      setInternationalTrip(response.data.data.internationalTrip);
    } catch (error) {
      console.error("Error fetching international trips:", error);
    }
  };


const fetchSlidePackages = async () => {
  const query = `
    query {
      getPackagesByMaxPrice {
        packageid
        package_img
        title
        description
        days
        price
        location
      }
    }
  `;
  try {
    const response = await axios.post("http://localhost:3000/graphql", {
      query,
    });
    const data = response.data.data.getPackagesByMaxPrice;
    setSlidePackages(data); 
  } catch (error) {
    console.error("Error fetching slide packages:", error);
  }
};

  useEffect(() => {
    fetchBestPackage();
    fetchVisaFree();
    fetchInternationalTrip();
    fetchSlidePackages();
  }, []);
 
  const handleBookNow = (data)=>{
    navigate('/bookpackage',{state:{package:data}})
  }
  const handleCard = (card) => {
    navigate(`/package/${card.location}`);
  };

  return (
    <div className="home-outer-con">
      <div className="home-slide-container">
      {slidePackages && slidePackages.length > 0 ? (
        <Slide autoplay={true} duration={3000} transitionDuration={500}>
          {slidePackages.map((data) => (
            <div
              key={data.packageid}
              
            >
              <img src={data?.package_img} alt="" className="home-slide-img"/>
              <p className="home-slide-title">{data?.title}</p>
              <p className="home-slide-price">&#8377; {data?.price} onwards</p>
              <button className="home-slide-booknow-button" onClick={()=>handleBookNow(data)}>Book Now</button>

            </div>
          ))}
        </Slide>
      ) : (
        <div>Loading slides...</div>
      )}
    </div>

       <div className="home-package-outer-con">
         <h1>BEST PACKAGES</h1>
        <div className="home-package-con">
           {bestpackage.map((card) => (
            <div
              key={card.id}
              className="home-package-card"
              onClick={() => handleCard(card)}
            >
              <img src={card.image} alt={card.location} />
              <p>{card.location}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="home-package-outer-con">
        <h1>VISA FREE DESTINATIONS</h1>
        <div className="home-package-con">
          {visaFree.map((card) => (
            <div
              key={card.id}
              className="home-package-card"
              onClick={() => handleCard(card)}
            >
              <img src={card.image} alt={card.location} />
              <p>{card.location}</p>
            </div>
          ))}
        </div>
      </div>

     
      <div className="home-package-outer-con">
        <h1>INTERNATIONAL TRIPS</h1>
        <div className="home-package-con">
          {internationalTrip.map((card) => (
            <div
              key={card.id}
              className="home-package-card"
              onClick={() => handleCard(card)}
            >
              <img src={card.image} alt={card.location} />
              <p>{card.location}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="home-faq-container">
      <Faqs/>
      </div>
    </div>
  );
};

export default Home;

