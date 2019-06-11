import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

export class InputDropDown extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            dropdownOpen: false,
            location: "Select Location"
        };
    }
    
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    
    onSelect = (value) => {
        this.setState(prevState => ({
            location: value,
            dropdownOpen: !prevState.dropdownOpen
        }), () => this.props.onSelect(value))
    }
    
    render() {
        const { location, dropdownOpen } = this.state;
        return (
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="transparent">{location}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem disabled>Select Location</DropdownItem>
                    <DropdownItem onClick={() => this.onSelect("Benguluru")}>Benguluru</DropdownItem>
                    <DropdownItem>Chennai</DropdownItem>
                    <DropdownItem>Delhi</DropdownItem>
                    <DropdownItem>Hyderabed</DropdownItem>
                    <DropdownItem>Mumbai</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}
