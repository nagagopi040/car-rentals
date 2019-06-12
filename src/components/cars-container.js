import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import ReactPaginate from "react-paginate";

import { CarCard } from "./../components";
import { Common } from '../utils';

export class CarsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            cars: [],
            limit: 6,
            offset: 0,
            sort: ""
        }
    }

    componentDidMount(){
        let  { offset, limit } = this.state;
        let { location, selectedDate } = this.props;
        Common.getCars()
            .then(res => {
                var pageLength = Common.getNoOfPages(res, location);
                let allCars = Common.getCarsFromLocation(res, location);
                var data = Common.getCarsForLimit(res, location, offset, limit)
                this.setState({
                    allCars: allCars,
                    cars: data,
                    pageLength,
                    location,
                    selectedDate
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handlePageClick = (value) => {
        let { allCars, location } = this.state;
        let newOffset = value.selected * 6;
        let newLimit = 6 * (value.selected+1);
        const newCars = allCars.slice(newOffset, newLimit);
        this.setState({
            cars: newCars,
            offset: newOffset,
            limit: newLimit
        })
    }

    render() {
        const { cars } = this.state;
        return (
            <>
            <Row>
                {
                    cars && cars.map( (car, index) => {
                        return ( 
                            <Col className="col-12 col-md-4" key={index}>
                                <CarCard car={car} />
                            </Col>
                        )
                    })
                }
            </Row>
            <Row>
                <Col>
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    pageCount={this.state.pageLength}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"d-flex flex-row justify-content-around pagination"}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
                </Col>
            </Row>
            </>
        );
    }
}