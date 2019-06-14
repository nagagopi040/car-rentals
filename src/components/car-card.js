import React, { Component } from "react";
import { Card, CardBody, CardHeader, CardFooter, CardImg, CardTitle, CardText, Button } from "reactstrap";
import { Common } from "../utils";

export class CarCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            selected: false
        }
    }

    // Select button functionality
    onSelect = () => {
        this.setState({
            selected: true
        })
    }

    render() {
        const { selected } = this.state;
        const { car, day } = this.props;
        
        // Render Method for car
        return (
            <Card className={`mb-4 car-card ${selected? "selected-card" : ""}`} >
                <CardHeader tag="h4" className="border-0">{car.name}</CardHeader>
                <div className="d-flex flex-row">
                    <CardBody>
                        <CardImg src={car.photo} className="car-image" />
                    </CardBody>
                    <CardBody>
                        <CardText><img className="location-icon" src="https://www.mylescars.com/images/car-Location-Icon.png" /><span className="px-2">{car.location}</span></CardText>
                        <CardText><img src="https://www.mylescars.com/images/am-icon.png" /><span className="px-2">{car.transmission}</span></CardText>
                        <CardText><img src="https://www.mylescars.com/images/seater-icon.png" /><span className="px-2">{car.seats} Seater</span></CardText>
                        <CardText><img src="https://www.mylescars.com/images/fuel-icon.png" /><span className="px-2">{car.fuel_Type}</span></CardText>
                        <CardText><img className="car_type" src="https://www.mylescars.com/images/nextcar/car-icon.png" /><span className="px-2">{car.car_Type}</span></CardText>
                    </CardBody>
                </div>
                <CardFooter className="border-0 d-flex flex-row justify-content-between">
                    <CardTitle>&#8377; {car.price}</CardTitle>
                    <Button color="info" className="book_button" onClick={this.onSelect} disabled={!Common.isDayAvailable(car.availability, day)}>Select</Button>
                </CardFooter>
                {
                    !Common.isDayAvailable(car.availability, day) &&
                    <div className="not-available">NOT AVAILABLE</div>
                }
            </Card>
        )
    }
}
