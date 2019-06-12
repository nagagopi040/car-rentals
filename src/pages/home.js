import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

import { InputSearch } from "./../components";

export class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedDate: null,
            location: "",
            redirect: false
        }
    }
    onSubmit = (selectedDate, location) => {
        if (selectedDate && location) {
            this.setState({
                selectedDate,
                location,
                redirect: true
            })
        }
    }

    render() {
        const { redirect, location, selectedDate } =this.state;
        if (redirect) {
            return (
                <Redirect
                    to={{
                        pathname: "/results",
                        state: { location, selectedDate }
                    }}
                />
            )
        }
        return (
            <Container>
                <Row>
                    <Col className="col-12 col-md-6 offset-md-3">
                        <InputSearch onSubmit={this.onSubmit} />
                    </Col>
                </Row>
            </Container>
        )
    }
}
