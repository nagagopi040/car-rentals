import React, { Component } from 'react';
import { Input } from "reactstrap";

export class SearchBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            searchCar: ""
        }
    }

    // Method to handle the searchtext in searchinputbox
    onSearchChange = (event) => {
        let searchCar = event.target.value;
        this.setState({searchCar});
        this.props.onSearchChange(searchCar);
    }

    render() {
        const { searchCar } = this.state;
        return (
            <div className="search-bar">
                <Input type="text" placeholder="Search a car or cartype" value={searchCar} onChange={this.onSearchChange} />
            </div>
        );
    }
}
