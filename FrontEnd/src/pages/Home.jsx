import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [bestpackage, setBestpackage] = useState([]);
  const [visaFree, setVisaFree] = useState([]);
  const [internationalTrip, setInternationalTrip] = useState([]);
  const navigator = useNavigate();
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

  const handleCard = (card) => {
    
    console.log(card.location);
    navigator(`/package/${card.location}`)
  };
  return (
    <>
      <div className="home-outer-con">
        <div className="home-package-outer-con">
          <h1>BEST PACKAGES</h1>
          <div className="home-package-con">
            {bestpackage.map((card) => (
              <div className="home-package-card" onClick={() => handleCard(card)}>
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
              <div className="home-package-card" onClick={() => handleCard(card)}>
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
              <div className="home-package-card" onClick={() => handleCard(card)}>
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
