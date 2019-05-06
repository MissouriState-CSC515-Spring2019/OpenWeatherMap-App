import React, { Component } from "react";
import "./UVIndex.css";
import "./sun.jpeg";
import { Table, Row, Col, Container } from "reactstrap";

class UVIndex extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;

    this.state = {
      error: null,
      apiKey: "304b69dfc8fd594456d6556ba7d5be48",
      uvUrl: "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=",
      zipUrl: "http://api.openweathermap.org/data/2.5/weather?zip=",
      loaded: false,
      latitude: "",
      longitute: "",
<<<<<<< HEAD
=======
      zip: params.zipcode === "" ? "65810" : params.zipcode,
>>>>>>> Elliott
      forecastIndex: []
    };
  }

  componentDidMount() {
    this.getDataWrapper();
  }

  componentDidCatch() {}

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.getDataWrapper();
      this.render();
    }
  }

  getDataWrapper() {
    this.getLatLon()
      .then(() => {
        this.getForecast();
      })
      .catch(e => {
        let state = this.state;
        state.error = true;
        state.loaded = true;
        this.setState(state);
      });
  }

  getLatLon() {
    return new Promise((res, rej) => {
      fetch(
        this.state.zipUrl + this.props.zip + ",us&appid=" + this.state.apiKey
      )
        .then(resp => resp.json())
        .then(data => {
          let state = this.state;
          state.latitude = data.coord.lat;
          state.longitute = data.coord.lon;
          state.error = false;
          this.setState(state);
          res();
        })
        .catch(e => {
          let state = this.state;
          state.error = true;
          this.setState(state);
          rej();
        });
    });
  }

  getForecast() {
    return new Promise((res, rej) => {
      fetch(
        this.state.uvUrl +
          this.state.apiKey +
          "&lat=" +
          this.state.latitude +
          "&lon=" +
          this.state.longitute +
          "&cnt=8"
      )
        .then(resp => resp.json())
        .then(data => {
          let currState = this.state;
          currState.forecastIndex = data;
          currState.loaded = true;
          currState.error = false;
          this.setState(currState);
          res();
        })
        .catch(e => {
          let state = this.state;
          state.error = true;
          state.loaded = true;
          this.setState(state);
          rej();
        });
    });
  }

  render() {
    const { error, loaded } = this.state;
    if (error) {
      return (
        <Container>
          <Row>
            <Col>
              <Table>
                <tbody>
                  <tr>
                    <td className="center">
                      <img src={require("./loading.gif")} alt="Loading" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      );
    } else if (!loaded) {
      return (
        <Container>
          <Row>
            <Col>
              <Table>
                <tbody>
                  <tr>
                    <td>Failed to load UV Index information.</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container>
          <Row>
            <Col>
              <Row>
                <Col>
                  <div className="center padding">
                    <img src={require("./sun.jpeg")} alt="sun" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row className="padding">
                    <Col>
                      <div className="center">
                        <h3>Forecast UV Index Information</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="padding">
                    <Col>
                      <Table>
                        <thead>
                          <tr>
                            <th className="center">Date</th>
                            <th className="center">UV Index</th>
                          </tr>
                        </thead>
                        <tbody className="table-color">
                          {this.state.forecastIndex.map(item => {
                            return (
                              <tr>
                                <td className="center">
                                  {item.date_iso.substr(
                                    0,
                                    item.date_iso.indexOf("T")
                                  )}
                                </td>
                                <td className="center">{item.value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default UVIndex;
