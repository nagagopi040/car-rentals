import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, CardImg, CardTitle, Button, CardText } from "reactstrap";

import { Common } from '../utils';

export class CarsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            cars: []
        }
    }

    componentDidMount(){
        Common.getCars()
            .then(res => {
                this.setState({
                    cars: res
                })
            })
    }

    render() {
        const { cars } = this.state;
        return (
            <Row>
                {
                    cars.map( (car, index) => {
                        return ( 
                            <Col className="col-12 col-md-4" key={index}>
                                <Card className="mb-4 car-card">
                                    <CardHeader tag="h4" className="border-0">{car.name}</CardHeader>
                                    <div className="d-flex flex-row">
                                        <CardBody>
                                            <CardImg src={car.photo} className="car-image" />
                                        </CardBody>
                                        <CardBody>
                                            <CardText><img src="https://www.mylescars.com/images/am-icon.png" /><span className="px-2">{car.transmission}</span></CardText>
                                            <CardText><img src="https://www.mylescars.com/images/seater-icon.png" /><span className="px-2">{car.seats} Seater</span></CardText>
                                            <CardText><img src="https://www.mylescars.com/images/fuel-icon.png" /><span className="px-2">{car.fuel_Type}</span></CardText>
                                            <CardText><img className="car_type" src="https://www.mylescars.com/images/nextcar/car-icon.png" /><span className="px-2">{car.car_Type}</span></CardText>
                                        </CardBody>
                                    </div>
                                    <CardFooter className="border-0 d-flex flex-row justify-content-between">
                                        <CardTitle>&#8377; {car.price}</CardTitle>
                                        <Button color="info" className="book_button">Book</Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        );
    }
}