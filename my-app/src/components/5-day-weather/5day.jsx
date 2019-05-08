import React, { Component } from "react";
import { Container, Row, Card, Col, Table} from 'reactstrap';
import "./5day.css";

class FiveDay extends React.Component {

    constructor(props) {
        super(props);
        const { match: { params } } = this.props;

        this.state = {
            error: null,
            isLoaded: false,
            results: null,
            key: '304b69dfc8fd594456d6556ba7d5be48',
            zipcode: params.zipcode === "" ? "65810" : params.zipcode
        };
    }

    componentConvertTemp(temp){
        return Math.round((parseInt(temp, 10) - 273.15) * (9/5) + 32);
    }

    componentDidMount() {
        this.update()
    }

    getIcon(iconId) {

        if (iconId > 199 && iconId < 300) {
            //thunderstorm
            return <img src="http://openweathermap.org/img/w/11d.png" alt="Thunderstorm thumbnail" />
            // return "11d";

        } else if (iconId > 299 && iconId < 400) {
            // drizzle
            return <img src="http://openweathermap.org/img/w/09d.png" alt="Drizzle thumbnail" />
            // return "09d";

        } else if (iconId > 499 && iconId < 600) {
            // rain
            return <img src="http://openweathermap.org/img/w/10d.png" alt="Rain thumbnail" />
            // return "10d";

        } else if (iconId > 599 && iconId < 700) {
            // snow
            return <img src="http://openweathermap.org/img/w/13d.png" alt="Snow thumbnail" />
            // return "13d";

        } else if (iconId > 699 && iconId < 800) {
            // atmosphere
            return <img src="http://openweathermap.org/img/w/50d.png" alt="Atmosphere related weather condition thumbnail" />
            // return "50d";

        } else if (iconId === 800) {
            // clear
            return <img src="http://openweathermap.org/img/w/01d.png" alt="Sunny thumbnail" />
            // return "01d";

        } else if (iconId === 801) {
            // some clouds
            return <img src="http://openweathermap.org/img/w/02d.png" alt="Light-to-no Clouds thumbnail" />
            // return "02d";

        } else if (iconId === 802) {
            // more clouds
            return <img src="http://openweathermap.org/img/w/03d.png" alt="medium clouds thumbnail" />
            // return "03d";

        } else {
            // all the clouds
            return <img src="http://openweathermap.org/img/w/04d.png" alt="Very Cloudy thumbnail" />
            // return "04d";
        }
    }

    update() {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zipcode},us&appid=${this.state.key}`)
            .then(resp => resp.json())
            .then(results => {
                this.setState({
                    isLoaded: true,
                    items: results
                })
            }).catch(err => {
                this.setState = { error: true };
            })
    }
    

    render() {
        if (this.state.error) {
            return <div>Error: {this.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            if(this.state.items.cod === "200"){
                var weatherMap = new Map();
                var days = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];

                //Mapping 5 day forcast temps together for average calcs
                this.state.items.list.forEach(el => {
                    console.log(el);
                    var date = new Date(el.dt_txt);
                    var day = days[date.getDay()];
                    if(!weatherMap.get(day)){
                        weatherMap.set(day, [[this.componentConvertTemp(el.main.temp)], el.weather[0].id]);
                    }else{
                        var currentList = weatherMap.get(day);
                        currentList[0].push(this.componentConvertTemp(el.main.temp));
                    }
                });

                
                return (
                    <div className="mainContainer">
                    <div className="topPad"></div>
                        <Card className="padding">
                            <h2>Five Day Forecast for: {this.state.items.city.name}</h2>
                            <Table className="weatherTable" borderless>
                                <tbody>
                                    <tr className="forcastDaysRow">
                                        {Array.from(weatherMap.keys()).map(key => {
                                            return (
                                                <td>
                                                    <tr className="center">{key}</tr>
                                                    <tr>{this.getIcon(weatherMap.get(key)[1])}</tr>
                                                    <tr className="center">High: {Math.max(...weatherMap.get(key)[0])}&#176;</tr>
                                                    <tr className="center">Low: {Math.min(...weatherMap.get(key)[0])}&#176;</tr>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                );
            } else if (this.state.items.cod === "404"){
                return(
                    <div>
                        <p>{this.state.items.message}</p>
                    </div>
                )
            } else {
                return(
                    <p>Not sure what happened but the status code wasn't 200 or 404.</p>
                )
            }
        }
    }
}
export default FiveDay;