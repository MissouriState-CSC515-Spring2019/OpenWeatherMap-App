import React, { Component } from "react";
import "./WeatherMap.css";

class WeatherMap extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = { error: null, loaded: false, map: "" };
  }

  componentDidMount() {
    //Not sure what needs to be done here yet.
  }

  render() {
    const { error, loaded, map } = this.state;
    if (error) {
        return <div>Error Stuff</div>
    } else if(!loaded){
        return <div>Loading gif</div>
    } else {
        return <div>Build weather map component</div>
    }
  }
}
