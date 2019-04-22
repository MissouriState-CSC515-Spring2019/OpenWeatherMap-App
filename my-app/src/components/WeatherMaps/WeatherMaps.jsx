import React, { Component } from "react";
import "./WeatherMaps.css";

const ApiKey = "304b69dfc8fd594456d6556ba7d5be48";
const zipcode = "65810";
const countrycode = "us";
const url =
  "https://api.openweathermap.org/data/2.5/weather?zip=" +
  zipcode +
  "," +
  countrycode +
  "&appid=" +
  ApiKey;

class WeatherMaps extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      error: null,
      loaded: false,
      maps: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        //Build Weather map components.
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  render() {
    const { error, loaded, maps } = this.state;
    if(error){
        return <div>Something went wrong.</div>;
    } else if (!loaded){
        return <div>Loading gif stuff goes here.</div>
    } else {
        return <div>Build weather maps component.</div>
    }
  }
}

export default WeatherMaps;
