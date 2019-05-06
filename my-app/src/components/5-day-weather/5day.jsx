import React, { Component } from "react";
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
            zipcode: params.zipcode
        };
    }

    componentConvertTemp(temp){
        return Math.round((parseInt(temp, 10) - 273.15) * (9/5) + 32);
    }

    componentDidMount() {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.zipcode},us&appid=${this.state.key}`)
        .then( resp => resp.json())
        .then( results => {
            console.log("fetched correctly");
            console.log(results);
            this.setState({
                isLoaded: true,
                items: results
            })
        }).catch(err => {
                this.setState = {error: true};
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
                    var date = new Date(el.dt_txt);
                    var day = days[date.getDay()];
                    if(!weatherMap.get(day)){
                        weatherMap.set(day, [this.componentConvertTemp(el.main.temp)]);
                    }else{
                        var currentList = weatherMap.get(day);
                        currentList.push(this.componentConvertTemp(el.main.temp));
                        weatherMap.set(day, currentList);
                    }
                });
                //console.log(weatherMap);
                
                return (
                    <div className="mainContainer">
                        {/* <p>Testing response data (temp):</p> */}
                        {/* <div>{this.componentConvertTemp(this.state.items.list[0].main.temp)}</div> */}
                        {/* <div>{this.state.items.city.name}</div> */}
                        
                        <table className="weatherTable">
                            <thead>Five Day Forcast for {this.state.items.city.name}</thead>
                            <tbody>
                                <tr className="forcastDaysRow">
                                    {Array.from(weatherMap.keys()).map(key => {
                                        return (
                                            <td>
                                                <tr>{key}</tr>
                                                <tr>{weatherMap.get(key)}</tr>
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>

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