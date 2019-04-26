import React, { Component } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Form, 
  FormGroup, 
  Input,  
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import './App.css';


const ApiKey = '304b69dfc8fd594456d6556ba7d5be48';
const zipcode = '65810';
const countrycode = 'us';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip='+ zipcode + ',' + countrycode + '&appid=' + ApiKey;

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }


  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(
        (result) => {
          let city = result.name;   
          console.log("City: " + city);
          this.setState({
             isLoaded: true,
             items: result.weather
          });
        },
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
        <Container>
          <Navbar color="light" light expand="lg">
            <NavbarBrand href="/">The Weather App </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/hourly/">Hourly Forecast</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/forecast/">5 Day Forecast</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/radar/">Weather Radar</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
    
            <Row className = "cityName">
              <h1>
                Current weather for Springfield...
              </h1>
          </Row> 
          <Row className = "weatherVals">
            <Col>Current Temperature</Col>
            <Col>High Temp</Col>
            <Col>Low Temp</Col>
            <Col>Hummidity</Col>
        </Row>
        <Row className = "weatherVals">
            <Col>69</Col>
            <Col>69</Col>
            <Col>69</Col>
            <Col>69</Col>
        </Row>
        </Container>
      );
    }
  }
}
export default MyComponent;
