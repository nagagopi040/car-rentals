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
        let { selectedDate, location } = this.props;
        if(location && selectedDate)
            this.setState({
                startDate: selectedDate,
                location
            });
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        })
    }

    onSelect = (location) => {
        this.setState({location})
    }

    onSubmit = () => {
        let { location, startDate } = this.state;
        let selectedDate = startDate;
        this.props.onSubmit(selectedDate, location);
    }

    render() {
        const { startDate, location } = this.state;
        const { buttonText } = this.props;
        return (
            <Form inline className="my-4" onSubmit={this.onSubmit}>
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
                <Button color="success" className="mx-2" disabled={!(location && startDate)}>{buttonText ? buttonText : "Book Now"}</Button>
            </Form>
        )
    }
}
