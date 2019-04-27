import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

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

    componentGetIcon(iconId){

        if (iconId > 199 && iconId < 300){
            //thunderstorm
            return "11d";

        } else if (iconId > 299 && iconId < 400){
            // drizzle
            return "09d";

        } else if (iconId > 499 && iconId < 600){
            // rain
            return "10d";

        } else if (iconId > 599 && iconId < 700){
            // snow
            return "13d";

        } else if (iconId > 699 && iconId < 800){
            // atmosphere
            return "50d";

        } else if (iconId == 800){
            // clear
            return "01d";

        }else if (iconId == 801){
            // some clouds
            return "02d";

        } else if (iconId == 802){
            // more clouds
            return "03d";

        } else {
            // all the clouds
            return "04d";
        }
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
                    {/* TIMS STUFF  */}
                        <Col>Testing response data (temp): {this.componentConvertTemp(this.state.items.main.temp)}</Col>
                        <Col>{this.state.items.weather[0].main}
                            <img src ={"http://openweathermap.org/img/w/" + this.componentGetIcon(this.state.items.weather[0].id) + ".png"}/>
                        </Col>
                        <Col>{this.state.items.weather[0].description}</Col>
                    {/* END TIMS STUFF */}
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