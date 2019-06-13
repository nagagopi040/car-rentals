import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import { InputSearch, CarsContainer } from "./../components";

export class Results extends Component {
    constructor(props){
        super(props);

        this.state = {
            location: null,
            selectedDate: null
        }
    }

    componentDidMount(){
        let { location, selectedDate } = this.props.location.state;
        if(location && selectedDate) {
            this.setState({
                location,
                selectedDate
            })
        }
    }

    modifySearch = (selectedDate, location) => {
        this.setState({
            location,
            selectedDate
        })
    }

    render() {
        let { location, selectedDate } = this.state;
        if(!(location && selectedDate)){
            return null;
        }
        
        return (
            <>
                <Row>
                    <Col className="col-12 col-md-6 offset-md-3">
                        <InputSearch location={location} selectedDate={selectedDate} buttonText="Modify Search" onSubmit={this.modifySearch} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CarsContainer location={location} selectedDate={selectedDate} />
                    </Col>
                </Row>
            </>
        );
    }
}
