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

    render() {
        if (this.state.error) {
            return <div>Error: {this.error.message}</div>;
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row className = "cityName">
                        <Col><h1>Current Weather for {this.state.items.name}</h1></Col>
                    </Row>
                    <Row>
                        {/* TIM DO HERE */}
                    </Row>
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>High Temp</th>
                                <th>Low Temp</th>
                                <th>Humidity</th>
                                <th>Pressure</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.componentConvertTemp(this.state.items.main.temp_max)}&#176;</td>
                                <td>{this.componentConvertTemp(this.state.items.main.temp_min)}&#176;</td>
                                <td>{this.state.items.main.humidity}</td>
                                <td>{this.state.items.main.pressure}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            );
        }
    }
}
export default Weather;