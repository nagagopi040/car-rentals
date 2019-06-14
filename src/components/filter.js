import React, { Component } from "react";
import { Button } from "reactstrap";

import { FilterDropDown } from "./../components";
import { Common } from "../utils";

export class Filter extends Component {
    constructor(props){
        super(props);

        this.state = {
            transmissionTypes: [],
            fuelTypes: [],
            carTypes: [],
            filters: {},
            clearFilter: false
        }
    }

    componentDidMount() {
        let { transmissionTypes, carTypes, fuelTypes } = Common;
        this.setState({
            transmissionTypes,
            fuelTypes,
            carTypes
        })
    }

    onFilterSelect = (value, filterType) => {
        let { filters } = this.state;
        filters[filterType] = value;
        this.setState({
            filters
        }, () => this.props.onFilter(filters));
    }

    clearFilter = () => {
        this.setState({
            filters: {},
            clearFilter: true
        }, () => this.props.onFilter(this.state.filters))
    }

    render() {
        const { transmissionTypes, carTypes, fuelTypes, clearFilter } = this.state;
        return (
            <div className="filter d-flex flex-row justify-content-between align-items-center">
                <div className="filter-label">
                    <span className="font-weight-bold pr-2">Filter By: </span>
                    <Button color="link" className="text-decoration-none pr-2" onClick={this.clearFilter}>Clear</Button>
                </div>
                <FilterDropDown data={transmissionTypes} label="Transmission" clearFilter={clearFilter} onSelect={(value) => this.onFilterSelect(value, "transmission")} />
                <FilterDropDown data={carTypes} label="CarType" clearFilter={clearFilter} onSelect={(value) => this.onFilterSelect(value, "car_Type")} />
                <FilterDropDown data={fuelTypes} label="FuelType" clearFilter={clearFilter} onSelect={(value) => this.onFilterSelect(value, "fuel_Type")} />
            </div>
        );
    }
}
