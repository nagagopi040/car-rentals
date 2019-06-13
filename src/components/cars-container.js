import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import ReactPaginate from "react-paginate";

import { CarCard, Filter, Sort, SearchBox  } from "./../components";
import { Common } from '../utils';

export class CarsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            cars: [],
            limit: 6,
            offset: 0,
            sort: "",
            searchCar: ""
        }
    }

    componentDidMount(){
        let  { offset, limit, sort, searchCar } = this.state;
        let { location, selectedDate } = this.props;
        Common.getCars()
            .then(res => {
                var pageLength = Common.getNoOfPages(res, location);
                let allCars = Common.getCarsFromLocation(res, location);
                var data = Common.getCarsForLimit(allCars, sort, offset, limit, searchCar);
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
        let { allCars } = this.state;
        let newOffset = value.selected * 6;
        let newLimit = 6 * (value.selected+1);
        const newCars = allCars.slice(newOffset, newLimit);
        this.setState({
            cars: newCars,
            offset: newOffset,
            limit: newLimit
        })
    }

    onSort = (sort) => {
        let { allCars, searchCar } = this.state;
        let cars = Common.getCarsForLimit(allCars, sort, 0, 6, searchCar);
        this.setState({
            cars,
            sort,
            offset: 0,
            limit: 6
        })
    }

    onSearchChange = (searchCar) => {
        let { allCars, sort, offset, limit } = this.state;
        let cars = Common.getCarsForLimit(allCars, sort, offset, limit, searchCar);
        this.setState({
            cars,
            searchCar
        })
    }

    render() {
        const { cars } = this.state;
        return (
            <>
            <Row>
                <Col className="my-4 d-flex flex-row justify-content-around align-items-center">
                    <Filter  />
                    <SearchBox onSearchChange={this.onSearchChange} />
                    <Sort onSort={this.onSort} />
                </Col>
            </Row>
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
                    containerClassName={"d-flex flex-row justify-content-center align-items-center pagination"}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
                </Col>
            </Row>
            </>
        );
    }
}