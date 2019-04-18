import React, { Component } from 'react';
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container>
          <Navbar color="light" light expand="lg">
            <NavbarBrand href="/">The Weather App</NavbarBrand>
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
      
          <Row>
            <Col id="Title">The Weather App</Col>
          </Row>
    
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} id="ZipCode-Form">
              <Form inline id="ZipCode-Form" >
                <FormGroup>
                  <Input id="ZipCode-Input" placeholder="ex. 65810"></Input>
                  <Button type="submit"> Search </Button>
                </FormGroup>
              </Form>
              </Col>
            </Row>
        </Container>
      );
    }
  }
}
export default MyComponent;
