import React from "react";
import { useState } from 'react';
import "./WeatherApp.css";
import searchi  from "../assets/search-icon.png";
import wind  from  "../assets/wind.png";
import humidity from "../assets/humidity.png";
import temp from "../assets/temp.png";
const WeatherApp = () => {
  
  const [isContentVisible, setContentVisible] = useState(false);
  const [error, setError] = useState("");
  let api_key = "886705b4c1182eb1c69f28eb8c520e20";
  async function search() {
    
    const element = document.getElementsByClassName("cityinput");
    if (element[0].value === "") {
      return 0;
    }
   
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
   
    let response = await fetch(url);
    if (response.ok) {
      setError("Enter a city name");
    let data = await response.json();
    setContentVisible(true);
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const humidity = document.getElementsByClassName("humidity-percent");
    location[0].innerHTML = data.name;
    
    humidity[0].innerHTML = data.main.humidity;
    wind[0].innerHTML = data.wind.speed;
    temperature[0].innerHTML = data.main.temp;

    }else{
      setContentVisible(false);
        setError("Invalid city name. Please enter a valid city name.");
    }
    
  }
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityinput" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img className="searchi" src={searchi} alt="" />
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
     
      {!error && !isContentVisible && <p>Enter a city name</p>}
      
     
     
        <div className={`content ${isContentVisible ? 'show' : ''}`}>
         <div className="data-container">
         <div className="weather-location"></div>

         <div className="element">
           <img src={temp} alt="" className="icon" />
           <div className="data">
             <div className="weather-temp"></div>
             <div className="text">Temperature</div>
           </div>
         </div>
 
         <div className="element">
           <img src={humidity} alt="" className="icon" />
           <div className="data">
             <div className="humidity-percent"></div>
             <div className="text">Humidity</div>
           </div>
         </div>
         <div className="element">
           <img src={wind} alt="" className="icon" />
           <div className="data">
             <div className="wind-rate"></div>
             <div className="text">Wind Speed</div>
           </div>
         </div>
       </div>
       </div>
    
    </div>
  );
};
export default WeatherApp;
