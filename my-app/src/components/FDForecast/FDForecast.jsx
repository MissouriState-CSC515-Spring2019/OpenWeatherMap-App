import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import "./FDForecast.css";

class FDForecast extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      loaded: false,
      weatherData: [
        {
          temp: 283.99,
          temp_min: 281.801,
          temp_max: 283.99,
          pressure: 989.94,
          sea_level: 1029.29,
          grnd_level: 989.94,
          humidity: 52,
          temp_kf: 2.19
        },
        {
          temp: 283.99,
          temp_min: 281.801,
          temp_max: 283.99,
          pressure: 989.94,
          sea_level: 1029.29,
          grnd_level: 989.94,
          humidity: 52,
          temp_kf: 2.19
        },
        {
          temp: 283.99,
          temp_min: 281.801,
          temp_max: 283.99,
          pressure: 989.94,
          sea_level: 1029.29,
          grnd_level: 989.94,
          humidity: 52,
          temp_kf: 2.19
        },
        {
          temp: 283.99,
          temp_min: 281.801,
          temp_max: 283.99,
          pressure: 989.94,
          sea_level: 1029.29,
          grnd_level: 989.94,
          humidity: 52,
          temp_kf: 2.19
        },
        {
          temp: 283.99,
          temp_min: 281.801,
          temp_max: 283.99,
          pressure: 989.94,
          sea_level: 1029.29,
          grnd_level: 989.94,
          humidity: 52,
          temp_kf: 2.19
        }
      ],
      error: null
    };
  }
  componentDidMount() {
    // fetch call here for 5 day forecast.
    let state = this.state;
    state.loaded = true;
    this.setState(state);
  }
  render() {
    if (this.error) {
      return <div>Error</div>;
    } else if (!this.state.loaded) {
      return <div>loading....</div>;
    } else if (this.state.loaded) {
      return (
        <Container className="force-height">
          <Row className="row-h">
            <Col className="row-h">
              <Row class="row-h">
                {this.state.weatherData.map(data => {
                  return (
                    <Col className="row-h">
                      <Row className="main-info">
                        <Col className="cell-border">
                          <Row>
                            <Col>
                              <Row className="weather">
                                <Col>Sunny</Col>
                              </Row>
                              <Row className="other">
                                <Col>Humidity: 50%</Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="padding-b sub-info cell-border">
                        <Col>
                          <Row>
                            <Col className="weather">
                              {"Low Temp: " + data.temp_min}
                            </Col>
                            <Col className="weather">
                              {"High Temp: " + data.temp_max}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default FDForecast;
