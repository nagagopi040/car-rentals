import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import ReactPaginate from "react-paginate";

import { CarCard, Filter, Sort, SearchBox  } from "./../components";
import { Common } from '../utils';

// Component for rendering the cars and it's functionality
export class CarsContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            location: "",
            selectedDate: null,
            cars: [],
            limit: 6,
            offset: 0,
            sort: "",
            filters: {},
            searchCar: "",
            isLoading: false,
            day: null
        }
    }

    // Method for Modified date and location
    componentWillReceiveProps(nextProps){
        nextProps && this.getInitialCars(nextProps.location, nextProps.selectedDate, 0, 6, "", "", {})
    }

    // Method to get Initial cars from the API
    getInitialCars = (location, selectedDate, offset, limit, sort, searchCar, filters) => {
        let day = Common.getDay(new Date(selectedDate).getDay());
        this.setState({isLoading: true})
        Common.getCars()
            .then(res => {
                var pageLength = Common.getNoOfPages(res, location);
                let allCars = Common.getCarsFromLocation(res, location);
                var data = Common.getCarsForLimit(allCars, day, sort, filters, offset, limit, searchCar);
                this.setState({
                    day,
                    allCars: allCars,
                    cars: data,
                    pageLength,
                    location,
                    selectedDate,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount(){
        let  { offset, limit, sort, searchCar, filters } = this.state;
        let { location, selectedDate } = this.props;
        this.getInitialCars(location, selectedDate, offset, limit, sort, searchCar, filters);
    }

    // Method for pagination Navigation
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

    // Method for sorting the cars based on Price
    onSort = (sort) => {
        let { allCars, day, searchCar, filters } = this.state;
        let cars = Common.getCarsForLimit(allCars, day, sort, filters, 0, 6, searchCar);
        this.setState({
            cars,
            sort,
            offset: 0,
            limit: 6
        })
    }

    // Method for searching a car or a cartype
    onSearchChange = (searchCar) => {
        let { allCars, day, sort, offset, limit, filters } = this.state;
        let cars = Common.getCarsForLimit(allCars, day, sort, filters, offset, limit, searchCar);
        this.setState({
            cars,
            searchCar
        })
    }

    // Method to filter cars based on Transmission, CarType, FuelType
    onFilter = (filters) => {
        let { allCars, day, sort, offset, limit, searchCar } = this.state;
        let cars = Common.getCarsForLimit(allCars, day, sort, filters, offset, limit, searchCar);
        this.setState({
            filters,
            cars
        })
    }

    render() {
        const { cars, isLoading, day } = this.state;
        if(isLoading){
            return <div className="text-center" >Cars are loading...</div>
        }
        return (
            <>
            <Row className="my-4 d-flex flex-row justify-content-between align-items-center">
                <Col className="col-12 col-md-7">
                    <Filter onFilter={this.onFilter} />
                </Col>
                <Col className="col-12 col-md-3">
                    <SearchBox onSearchChange={this.onSearchChange} />
                </Col>
                <Col className="col-12 col-md-2">
                    <Sort onSort={this.onSort} />
                </Col>
            </Row>
            {
                cars.length === 0 &&
                    <h4 className="text-center text-warning">Sorry, Currently we don't have cars as per your requirements</h4> 
            }
            <Row>
                {/* Rendering Method for carlist */}
                {
                    cars && cars.length > 0 && cars.map( (car, index) => {
                        return (
                            <Col className="col-12 col-md-4" key={index}>
                                <CarCard car={car} day={day} />
                            </Col>
                        )
                    })
                }
            </Row>
            {/* Pagination Render method */}
            {
                cars && cars.length > 0 && !isLoading &&
                <Row>
                    <Col>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={this.state.pageLength}
                        onPageChange={this.handlePageClick}
                        containerClassName={"d-flex flex-row justify-content-center align-items-center pagination"}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                    </Col>
                </Row>
            }
            </>
        );
    }
}