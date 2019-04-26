import React, { Component } from "react";
import "./UVIndex.css";
import "./sun.jpeg";
import { Table, Row, Col, Container } from "reactstrap";

// const ApiKey = "304b69dfc8fd594456d6556ba7d5be48";
// const zipcode = "65810";
// zip url = api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}
// const countrycode = "us";
// const url =
//   "http://api.openweathermap.org/data/2.5/uvi/forecast?appid={appid}&lat={lat}&lon={lon}&cnt={cnt}" +
//   zipcode +
// historial url: http://api.openweathermap.org/data/2.5/uvi/history?appid={appid}&lat={lat}&lon={lon}&cnt={cnt}&start={start}&end={end}
//   "," +
//   countrycode +
//   "&appid=" +
//   ApiKey;

class UVIndex extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      error: null,
      apiKey: "304b69dfc8fd594456d6556ba7d5be48",
      uvUrl: "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=",
      zipUrl: "http://api.openweathermap.org/data/2.5/weather?zip=",
      loaded: false,
      latitude: properties.latitude,
      longitute: properties.longitute,
      zip: properties.zip,
      forecastIndex: [
        { date: "01-02-2016", value: "10.87" },
        { date: "03-23-2019", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" }
      ],
      historyIndex: [
        { date: "01-02-2016", value: "10.87" },
        { date: "03-23-2019", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" },
        { date: "01-02-2016", value: "10.87" }
      ]
    };
  }

  componentDidMount() {
    fetch(
      this.state.zipUrl + this.state.zip + ",us&appid=" + this.state.apiKey
    )
    .then(resp => resp.json())
    .then(data => {
      let state = this.state;
      state.latitude = data.coord.lat;
      state.longitute = data.coord.lon;
    }).catch(e => {
      throw new Error(e);
    });

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
        console.log(data);
        let currState = this.state;
        currState.forecastIndex = data;
        this.setState(currState);
      })
      .catch(e => {
        throw new Error(e);
      });

    const startTime = new Date() - 24 * 60 * 60 * 1000,
      endTime = new Date() - 9 * 24 * 60 * 60 * 1000;
    fetch(
      this.state.uvUrl +
        this.state.apiKey +
        "&lat=" +
        this.state.latitude +
        "&lon=" +
        this.state.longitute +
        "&cnt=8&start=" +
        startTime +
        "&end=" +
        endTime
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        let currState = this.state;
        currState.historyIndex = data;
        currState.loaded = true;
        this.setState(currState);
      })
      .catch(e => {
        throw new Error(e);
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
                                <td className="center">{item.date}</td>
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
              <Row>
                <Col>
                  <Row className="padding">
                    <Col>
                      <div className="center">
                        <h3>Historical UV Index Information</h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="padding">
                    <Col>
                      <Table className="table-border">
                        <thead>
                          <tr>
                            <th className="center">Date</th>
                            <th className="center">UV Index</th>
                          </tr>
                        </thead>
                        <tbody className="table-color">
                          {this.state.historyIndex.map(item => {
                            return (
                              <tr>
                                <td className="center">{item.date}</td>
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
