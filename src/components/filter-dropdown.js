import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Common } from "../utils/common";

export class FilterDropDown extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            dropdownOpen: false,
            label: ""
        };
    }

    componentDidMount(){
        let { label, clear } = this.props;
        this.setState({label: clear ? "" : label});
    }
    
    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    
    onSelect = (value) => {
        this.setState(prevState => ({
            label: value,
            dropdownOpen: !prevState.dropdownOpen
        }), () => this.props.onSelect(value))
    }
    
    render() {
        const { dropdownOpen, label } = this.state;
        const { data, clearFilter } = this.props;
        return (
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="transparent">{clearFilter ? this.props.label : label}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem disabled>{label}</DropdownItem>
                    {
                        data.map( (item, index) => {
                            return (
                                <DropdownItem key={index} onClick={() => this.onSelect(item)}>{item}</DropdownItem>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        );
    }
}
