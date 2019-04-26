import React, { Component } from "react";

class FiveDay extends React.Component {

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
        fetch(`http://samples.openweathermap.org/data/2.5/forecast?zip=${this.props.zip},us&appid=${this.state.key}`)
        .then( resp => resp.json())
        .then( results => {
            console.log(results);
            this.setState({
                isLoaded: true,
                items: results
            })
        })
    }

    render() {
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>Whattup</div>
            );
        }
    }
}
export default FiveDay;