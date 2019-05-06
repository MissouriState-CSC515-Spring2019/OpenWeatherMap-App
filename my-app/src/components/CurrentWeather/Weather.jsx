import React, { Component } from "react";
import { Container, Row, Col, Table} from 'reactstrap';
import './styles.css';

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
            return <img src="http://openweathermap.org/img/w/11d.png" alt="Thunderstorm thumbnail"/>
            // return "11d";

        } else if (iconId > 299 && iconId < 400){
            // drizzle
            return <img src="http://openweathermap.org/img/w/09d.png" alt="Drizzle thumbnail"/>
            // return "09d";

        } else if (iconId > 499 && iconId < 600){
            // rain
            return <img src="http://openweathermap.org/img/w/10d.png" alt="Rain thumbnail"/>
            // return "10d";

        } else if (iconId > 599 && iconId < 700){
            // snow
            return <img src="http://openweathermap.org/img/w/13d.png" alt="Snow thumbnail"/>
            // return "13d";

        } else if (iconId > 699 && iconId < 800){
            // atmosphere
            return <img src="http://openweathermap.org/img/w/50d.png" alt="Atmosphere related weather condition thumbnail"/>
            // return "50d";

        } else if (iconId === 800){
            // clear
            return <img src="http://openweathermap.org/img/w/01d.png" alt="Sunny thumbnail"/>
            // return "01d";

        }else if (iconId === 801){
            // some clouds
            return <img src="http://openweathermap.org/img/w/02d.png" alt="Light-to-no Clouds thumbnail"/>
            // return "02d";

        } else if (iconId === 802){
            // more clouds
            return <img src="http://openweathermap.org/img/w/03d.png" alt="medium clouds thumbnail"/>
            // return "03d";

        } else {
            // all the clouds
            return <img src="http://openweathermap.org/img/w/04d.png" alt="Very Cloudy thumbnail"/>
            // return "04d";
        }
    }

    componentEpochConversion(epoch){
        // This will convert any epoch time to just the time HH:mm:ss AM/PM
        return new Date(epoch * 1000).toLocaleTimeString();
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
                        <Col className="weatherIcon">{this.componentGetIcon(this.state.items.weather[0].id)} {this.componentConvertTemp(this.state.items.main.temp)}&#176;</Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    {/* <Row>
                        <Col className="capitalize">{this.state.items.weather[0].description}</Col>
                    </Row> */}
                  
                    {/* TIMS STUFF  */}
                        {/* <Col xs="auto">Temp {this.componentConvertTemp(this.state.items.main.temp)}</Col> */}
                       
                            {/* <Row>{this.state.items.weather[0].main}</Row> */}
                            
                            
                            {/* <Row><img src ={"http://openweathermap.org/img/w/" + this.componentGetIcon(this.state.items.weather[0].id) + ".png"}/></Row> */}
                     
                    {/* <Row>
                        <Col xs="auto" className="capitalize">{this.state.items.weather[0].description}</Col>
                    </Row> */}
                        {/* <Col>
                            <Row>Sunrise</Row>
                            <Row>{this.componentEpochConversion(this.state.items.sys.sunrise)}</Row>
                        </Col>
                        <Col>
                            <Row>Sunset</Row>
                            <Row>{this.componentEpochConversion(this.state.items.sys.sunset)}</Row>
                        </Col> */}
                    {/* END TIMS STUFF */}
                  
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>High Temp</th>
                                <th>Low Temp</th>
                                <th>Humidity</th>
                                <th>Pressure</th>
                                <th>Sun Rise</th>
                                <th>Sun Set</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.componentConvertTemp(this.state.items.main.temp_max)}&#176;</td>
                                <td>{this.componentConvertTemp(this.state.items.main.temp_min)}&#176;</td>
                                <td>{this.state.items.main.humidity}%</td>
                                <td>{this.state.items.main.pressure}</td>
                                <td>{this.componentEpochConversion(this.state.items.sys.sunrise)}</td>
                                <td>{this.componentEpochConversion(this.state.items.sys.sunset)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            );
        }
    }
}
export default Weather;