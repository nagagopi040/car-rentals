import React, { Component } from 'react';

export class Sort extends Component {
    constructor(props){
        super(props);

        this.state = {
            sort: "",
            isSort: false
        }
    }

    // Sorting method
    onSort = () => {
        let { sort } = this.state;
        this.setState({
            sort : (sort === "" || sort === "DESC") ? "ASC" : "DESC",
            isSort: true
        }, () => {
            this.props.onSort && this.props.onSort(this.state.sort)
        })
    }

    render() {
        const { sort, isSort } = this.state;
        return (
            <div className="sort-bar">
                <span className="font-weight-bold pr-4">Sort By: </span>
                <a href="javscript:void(0)" onClick={this.onSort} className="text-decoration-none">
                    <span>Price</span>
                    {
                        isSort &&
                        <span className={`${sort === "ASC"? "up": "down"}-arrow`}>
                            <img src="https://www.mylescars.com/images/sorting2.png" />
                        </span>
                    }
                </a>
            </div>
        );
    }
}
