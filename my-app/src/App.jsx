import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem
} from 'reactstrap';
import './App.css';
import FiveDay from './components/5-day-weather/5day';
import UVIndex from "./components/UVIndex/UVIndex";
import Weather from "./components/CurrentWeather/Weather";


const ApiKey = '304b69dfc8fd594456d6556ba7d5be48';
const zipcode = '65810';
const countrycode = 'us';
const url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',' + countrycode + '&appid=' + ApiKey;


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
        zip: elem.target.value
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
      <Router>
        <Container>
          <Navbar class="navbar" color="light" light expand="lg">
            <NavbarBrand id="icon" href="/">The Weather App</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/">Current Weather</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/forecast">5 Day Forecast</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/uv">UV</Link></NavLink>
              </NavItem>
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
            </Nav>
          </Navbar>
        

          <Switch>
            <Route path="/" exact render={(props) => <Weather {...this.state} />} />
            <Route path="/forecast" component={FiveDay} />
            <Route path="/UV" component={UVIndex} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default MyComponent;
