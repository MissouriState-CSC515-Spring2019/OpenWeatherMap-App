import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import '/Users/danielcourtney/CSC515/FinalProject/OpenWeatherMap-App/my-app/src/App.jsx';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            isLoaded: false,
            results: null,
            key: '304b69dfc8fd594456d6556ba7d5be48',
        };
    }

    componentDidMount() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.props.zip},us&appid=${this.state.key}`)
        .then( resp => resp.json())
        .then( results => {
            this.setState({
                isLoaded: true,
                items: results
            })
        })
    }

    componentConvertTemp(temp){
        return Math.round((parseInt(temp, 10) - 273.15) * (9/5) + 32);
    }

    render() {
        if (this.state.error) {
            return <div>Error: {this.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row className = "cityName">
                        <Col><h1>Current Weather for: {this.state.items.name}</h1></Col>
                    </Row>
                    <Row>
                        {/* TIM DO HERE */}
                    </Row>
                    <Row className = "weatherTable">
                        <Col>High Temp</Col>
                        <Col>Low Temp</Col>
                        <Col>Humidity</Col>
                        <Col>Pressure</Col>
                    </Row>
                    <Row>
                        <Col>{this.state.items.main.temp_max}</Col>
                        <Col>{this.state.items.main.temp_min}</Col>
                        <Col>{this.state.items.main.humidity}</Col>
                        <Col>{this.state.items.main.pressure}</Col>
                    </Row>
                </Container>
            );
        }
    }
}
export default Weather;