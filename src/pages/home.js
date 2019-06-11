import React, { Component } from "react";
import { InputSearch } from "./../components";
import { Container, Row, Col } from "reactstrap";

export class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col className="col-12 col-md-6 offset-md-3">
                        <InputSearch />
                    </Col>
                </Row>
            </Container>
        )
    }
}
