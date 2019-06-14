import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Common } from "../utils/common";

export class InputDropDown extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            dropdownOpen: false,
            location: "Select Location",
            cities: []
        };
    }

    componentDidMount(){
        let { location } = this.props;
        let cities = Common.allCities;
        this.setState({cities});
        if(location) this.setState({location})
    }
    
    // Method to toggle the dropdownmenu
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    
    // Method to call callback function onSelecting the Location
    onSelect = (value) => {
        this.setState(prevState => ({
            location: value,
            dropdownOpen: !prevState.dropdownOpen
        }), () => this.props.onSelect(value))
    }
    
    render() {
        const { location, dropdownOpen, cities } = this.state;
        return (
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="transparent">{location}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem disabled>Select Location</DropdownItem>
                    {
                        cities.map( (city, index) => {
                            return (
                                <DropdownItem key={index} onClick={() => this.onSelect(city)}>{city}</DropdownItem>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        );
    }
}
