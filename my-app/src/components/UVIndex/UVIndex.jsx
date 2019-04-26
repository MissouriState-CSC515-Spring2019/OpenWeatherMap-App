import React, { Component } from "react";
import "./UVIndex.css";
import "./sun.jpeg";
import { Table, Row, Col, Container } from "reactstrap";

const ApiKey = "304b69dfc8fd594456d6556ba7d5be48";
const zipcode = "65810";
const countrycode = "us";
const url =
  "https://api.openweathermap.org/data/2.5/weather?zip=" +
  zipcode +
  "," +
  countrycode +
  "&appid=" +
  ApiKey;

class UVIndex extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      error: null,
      loaded: false,
      zip: "",
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
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        //Build Weather map components.
        let currState = this.state;
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
