import React, { Component } from 'react';
import './App.css';

const ApiKey = '304b69dfc8fd594456d6556ba7d5be48';
const zipcode = '65810';
const countrycode = 'us';
const url = 'api.openweathermap.org/data/2.5/weather?zip='+ zipcode + ',' + countrycode + '&appid=' + ApiKey;


class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result.weather
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <p>Hello</p>
      );
    }
  }
}
export default MyComponent;
