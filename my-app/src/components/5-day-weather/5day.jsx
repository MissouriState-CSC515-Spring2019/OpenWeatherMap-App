import React, { Component } from "react";

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
                return (
                    <div>
                        <p>Testing response data (temp):</p>
                        <div>{this.state.items.list[0].main.temp}</div>
                        <div>{this.state.items.city.name}</div>
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