import React, { Component } from "react";
import { Container, Row, Card, Col, Table} from 'reactstrap';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        const { match: { params } } = this.props;

        this.state = {
            error: null,
            isLoaded: false,
            results: null,
            key: '304b69dfc8fd594456d6556ba7d5be48',
            zip: params.zipcode === "" ? "65810" : params.zipcode
        };
    }
    // componentDidUpdate(prevProps){
        
    //     if(this.props.zip !== prevProps.zip){
    //         this.props.zip = prevProps.zip;
    //     }
    // }

    componentDidMount() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&appid=${this.state.key}`)
        .then( resp => resp.json())
        .then( results => {
            this.setState({
                isLoaded: true,
                items: results
            })
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error: true
            });
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
                    <div className="topPad"></div>
                    <div className = "overall">
                        <Row className = "cityName">
                            <Col><h1>Current Weather for: {this.state.items.name}</h1></Col>
                        </Row>
                        <Row>
                            <Col xs="3" className="weatherIcon">{this.componentGetIcon(this.state.items.weather[0].id)}</Col>
                            <Col className="capitalize">{this.componentConvertTemp(this.state.items.main.temp)}&#176;<br></br> {this.state.items.weather[0].description}</Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>

                        
                            <Table className ="weatherTable"dark>
                                <thead>
                                    <tr>
                                        <th>High Temp</th>
                                        <th>Low Temp</th>
                                        <th>Humidity</th>
                                        <th>Wind</th>
                                        <th>Sun Rise</th>
                                        <th>Sun Set</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.componentConvertTemp(this.state.items.main.temp_max)}&#176;</td>
                                        <td>{this.componentConvertTemp(this.state.items.main.temp_min)}&#176;</td>
                                        <td>{this.state.items.main.humidity}%</td>
                                        <td>{Math.round(this.state.items.wind.speed * 2.237)} mph</td>
                                        <td>{this.componentEpochConversion(this.state.items.sys.sunrise)}</td>
                                        <td>{this.componentEpochConversion(this.state.items.sys.sunset)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    
                </Container>
            );
        }
    }
}
export default Weather;