import React from "react";
import "./UVIndex.css";
import "./sun.jpeg";
import { Table, Row, Col, Container } from "reactstrap";

class UVIndex extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;

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
    this.render();
  }

  componentDidCatch() {
    this.setState({ error: true, loaded: true });
  }

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
        this.setState({ error: true, loaded: true });
      });
  }

  getLatLon() {
    return new Promise((res, rej) => {
      fetch(
        this.state.zipUrl + this.state.zip + ",us&appid=" + this.state.apiKey
      )
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            loaded: true,
            latitute: data.coord.lat,
            longitute: data.coord.long
          });
          res();
        })
        .catch(e => {
          this.setState({ error: true, loaded: true });
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
          this.setState({ error: false, loaded: true });
          res();
        })
        .catch(e => {
          this.setState({ error: true, loaded: true });
          rej();
        });
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Container>
          <Row>
            <Col>
              <Table>
                <tbody className="table-color">
                  <tr>
                    <td className="center">
                      Failed to load UV Index information. Please make sure the
                      zip code is valid.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      );
    } else if (!this.state.loaded) {
      return (
        <Container>
          <Row>
            <Col>
              <Table>
                <tbody className="table-color">
                  <tr>
                    <td className="center">
                      <div>Loading UV Index information.</div>
                      <img
                        className="roundedLoading"
                        src={require("./loading.gif")}
                        alt="Loading"
                      />
                    </td>
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
