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
      zip: params.zipcode === "" ? "65810" : params.zipcode,
      forecastIndex: []
    };
  }

  componentDidMount() {
    this.getDataWrapper();
  }

  getDataWrapper() {
    this.getLatLon()
      .then(() => {
        this.getForecast();
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  getLatLon() {
    return new Promise((res, rej) => {
      fetch(
        this.state.zipUrl + this.state.zip + ",us&appid=" + this.state.apiKey
      )
        .then(resp => resp.json())
        .then(data => {
          let state = this.state;
          state.latitude = data.coord.lat;
          state.longitute = data.coord.lon;
          this.setState(state);
          res();
        })
        .catch(e => {
          rej();
          throw new Error(e);
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
          this.setState(currState);
          res();
        })
        .catch(e => {
          rej();
          throw new Error(e);
        });
    });
  }

  render() {
    const { error, loaded } = this.state;
    if (error) {
      return <div>Something went wrong.</div>;
    } else if (!loaded) {
      return <div>Loading gif stuff goes here.</div>;
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
