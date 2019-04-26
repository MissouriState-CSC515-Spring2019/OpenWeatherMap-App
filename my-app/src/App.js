import React, { Component } from 'react';m";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Form, 
  FormGroup, 
  Label,
  Input,  
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem 
} from 'reactstrap';
import './App.css';
import FiveDay from './components/5-day-weather/5day';


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
      key: ApiKey,
      zip: zipcode,
      items: null
    };

    this.changeZip = this.changeZip.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.updateData(event);
    }
  }

  componentDidMount() {
    this.updateData()
  }

  changeZip(elem) {
    elem.persist();
    this.setState(
      state => ({
        zip : elem.target.value
      })
    );
  }

  updateData(elem) {
    this.setState({
      isLoaded: false,
      error: null
    });
    if (elem) {
      elem.preventDefault();
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${this.state.key}`)
      .then(response => {
        return response.json();
      })
      .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result
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

    return (
      <Container>
        <Navbar color="light" light expand="lg">
          <NavbarBrand href="/">The Weather App</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Form inline id="ZipCode-Form" >
                <FormGroup>
                  <Input id="ZipCode-Input"
                    placeholder="e.g. 65810"
                    value={this.state.zip}
                    onChange={this.changeZip}
                    onKeyPress={this.handleKeyPress}
                  ></Input>
                  <Button 
                    type="submit"
                    onClick={this.updateData}
                  > Search </Button>
                </FormGroup>
              </Form>
            </NavItem>
            <NavItem>
              <NavLink href="./">Current Weather</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="./forecast/">5 Day Forecast</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="./UV/">UV</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>

      <Route path="/" exact component={MyComponent} />
      <Route path="/forecast/" component={FiveDay} />
      <Route path="/users/" component={Users} />
    );
  }
}

export default MyComponent;
