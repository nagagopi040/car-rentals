import React, { Component } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import DatePicker from "react-datepicker";

import { InputDropDown } from "./dropdown";

export class InputSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            startDate: null,
            location: null
        }
    }

    componentDidMount() {
        let { selectedDate } = this.props;
        this.setState({
            startDate: selectedDate
        });
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        })
    }

    onSelect = (location) => {
        console.log(location);
        this.setState({location})
    }

    render() {
        const { startDate, location } = this.state;
        return (
            <Form inline className="my-4">
                <FormGroup className="mx-2">
                    <InputDropDown location={this.props.location} onSelect={this.onSelect} />
                </FormGroup>
                <FormGroup className="mx-2">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        // maxDate={addMonths(new Date(), 2)}
                        showDisabledMonthNavigation
                        placeholderText="select date"
                    />
                </FormGroup>
                <Button color="success" className="mx-2" disabled={!(location && startDate)}>Book Now</Button>
            </Form>
        )
    }
}
