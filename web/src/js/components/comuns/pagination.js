'use strict';

import React from 'react';

let Pagination = React.createClass({

    propTypes: {
       numberOfPages: React.PropTypes.number,
       totalItems: React.PropTypes.number
    },

    getInitialState() {
        return {
            currentPage: 0
        };
    },

    getDefaultProps() {
        return {
            numberOfPages: 10,
            totalItems: 0
        }
    },

    onSelectPage(page) {
        this.setState({ currentPage : page });
    },

    render() {
        let itemsPerPage = 10;
        let totalRecords = 100;
        let totalPages = (totalRecords / itemsPerPage);
        let currentPage = this.state.currentPage;
        let maxSize = 2; // how many pages to display before and after the current page
        let pages = [];
        let prevPage = null;
        let nextPage = null;

        if (totalPages === 1) {
            return;
        }

        if (currentPage > 1) {
            prevPage = (<BoundaryPageLink active={true} label="Anterior" page={currentPage - 1} onPage={this.onSelectPage}/>);
        } else {
            prevPage = (<BoundaryPageLink active={false} label="Anterior" page={currentPage - 1} onPage={this.onSelectPage}/>);
        }

        if (currentPage == 1) {
            pages.push({ page:1, active: true });
        } else {
            pages.push({ page:1, active: false });
        }

        // besides the first and last page, how many pages do we need to display?
        let how_many_times = 2 * maxSize + 1;
        let left = Math.max(2, currentPage - 2 * maxSize - 1);
        let right = Math.min(totalPages - 1, currentPage + 2 * maxSize + 1);

        // the upper range restricted by left and right are more loosely than we need,
        // so we further restrict this range we need to display
        while (right - left > 2 * maxSize) {
            if (currentPage - left < right - currentPage) {
                right--;
                right = right < currentPage ? currentPage : right;
            } else {
                left++;
                left = left > currentPage ? currentPage : left;
            }
        }

        // now display the middle pages, we display how_many_times pages from page left
        for (let i = 1, out = left; i <= how_many_times; i++, out++) {
            if (out > right) {
                continue;
            }

            if (out == currentPage) {
                pages.push({ page: out, active: true });
            } else {
                pages.push({ page: out, active: false });
            }
        }

        // always display the last page
        if (currentPage == totalPages) {
            pages.push({ page: totalPages, active: true });
        } else {
            pages.push({ page: totalPages, active: false });
        }

        // if we are not at the last page, then display the "Next" button
        if (currentPage < totalPages) {
            nextPage = (<BoundaryPageLink active={true} label="Próximo" page={currentPage + 1} onPage={this.onSelectPage}/>);
        } else {
            nextPage = (<BoundaryPageLink active={false} label="Proxímo" page={currentPage + 1} onPage={this.onSelectPage}/>);
        }

        return (
            <div className="panel-footer right">
                <ul className="pagination">
                    {prevPage}

                    {pages.map((item, index) => {
                        return (<PageLink key={index} page={item.page} active={item.active} onPage={this.onSelectPage}/>);
                    })}

                    {nextPage}
                </ul>
            </div>
        );
    }

});

let PageLink = React.createClass({

    propTypes: {
       onPage: React.PropTypes.func,
       active: React.PropTypes.bool
    },

    getDefaultProps() {
        return {  page: 0, active: false };
    },

    onChangePage() {
        this.props.onPage(this.props.page);
    },

    render() {
        if (this.props.active) {
            return (
                <li className="active"><a href="#" onClick={this.onChangePage}>{this.props.page}</a></li>
            );
        }

        return (
            <li><a href="#" onClick={this.onChangePage}>{this.props.page}</a></li>
        );
    }

});

let BoundaryPageLink = React.createClass({

    propTypes: {
       onPage: React.PropTypes.func,
       label: React.PropTypes.string,
       active: React.PropTypes.bool
    },

    getDefaultProps() {
        return {  page: 0, label: '' };
    },

    onChangePage() {
        this.props.onPage(this.props.page);
    },

    render() {
        let stateClass = this.props.active ? 'enabled' : 'disabled';

        return (
            <li className={stateClass}>
                <a href="#" aria-label={this.props.label} onClick={this.onChangePage}>
                    <span aria-hidden="true">{this.props.label}</span>
                </a>
            </li>
        );
    }

});

export default Pagination;
