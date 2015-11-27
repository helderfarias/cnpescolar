'use strict';

import React from 'react';

let Pagination = React.createClass({

    getInitialState() {
        return {
            currentPage: 1,
            itemsPerPage: 0,
        };
    },

    getDefaultProps() {
        return {
            initialItemsPerPage: 5,
            totalCount: 0,
            pageSize: [5, 10, 20, 50, 100],
            previousText: 'Anterior',
            nextText: 'Próximo',
            firstText: 'Primeiro',
            lastText: 'Último'
        }
    },

    componentDidMount() {
        this.setState({ itemsPerPage: this.props.initialItemsPerPage });
    },

    onSelectPage(page) {
        if (this.props.onChangePage) {
            let config = this.calculatePageSize(page);

            this.props.onChangePage(new PageEvent(page, this.state.itemsPerPage, config.fromPage, config.toPage));
        }

        this.setState({ currentPage: page });
    },

    onSelectPageSize(e) {
        if (this.props.onChangePageSize) {
            this.props.onChangePageSize(new PageEvent(1, e.limit, 1, e.limit));
        }

        this.setState({ itemsPerPage: e.limit, currentPage: 1 });
    },

    calculateTotalPages() {
        let total = Math.ceil(this.props.totalCount / this.state.itemsPerPage);

        return Math.max(total, 1);
    },

    calculatePages(totalPages, maxSize) {
        let currentPage = this.state.currentPage;
        let how_many_times = 2 * maxSize + 1;
        let left = Math.max(2, currentPage - 2 * maxSize - 1);
        let right = Math.min(totalPages - 1, currentPage + 2 * maxSize + 1);
        let pages = [];

        while (right - left > 2 * maxSize) {
            if (currentPage - left < right - currentPage) {
                right--;
                right = right < currentPage ? currentPage : right;
            } else {
                left++;
                left = left > currentPage ? currentPage : left;
            }
        }

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

        return {
            pages: pages,
            left: left,
            right: right
        };
    },

    calculatePageSize(page) {
        return {
            fromPage: ((page - 1) * this.state.itemsPerPage) + 1,
            toPage: (page * this.state.itemsPerPage)
        };
    },

    empty() {
        let pageSizeConfig = this.calculatePageSize(this.state.currentPage);

        return (
            <nav className={this.props.position}>
                <div className="row fixed-table-pagination-row">
                    <div className="fixed-table-pagination">
                        <div className="pull-left pagination-detail">
                            <PageSize fromPage={pageSizeConfig.fromPage}
                                        toPage={pageSizeConfig.toPage}
                                        limits={this.props.pageSize}
                                        totalCount={this.props.totalCount}
                                        onPageSize={this.onSelectPageSize}
                                        selected={this.state.itemsPerPage}/>
                        </div>

                        <div className="pull-right pagination">
                            <nav className={this.props.position}>
                                <ul className="pagination">
                                    <BoundaryPageLink active={false} label={this.props.firstText} />
                                    <BoundaryPageLink active={false} label={this.props.previousText} />
                                    <PageLink active={true} page={1} />
                                    <BoundaryPageLink active={false} label={this.props.nextText} />
                                    <BoundaryPageLink active={false} label={this.props.lastText}/>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </nav>
        );
    },

    render() {
        let currentPage = this.state.currentPage;
        let maxSize = 2;
        let pages = [];
        let prevPage = null;
        let nextPage = null;
        let firstPage = null;
        let lastPage = null;
        let infinityPagesLeft = null;
        let infinityPagesRight = null;

        let totalPages = this.calculateTotalPages();
        if (totalPages === 1) {
            return this.empty();
        }

        let pageSizeConfig = this.calculatePageSize(currentPage);

        if (currentPage > 1) {
            prevPage = { page: (currentPage - 1), active: true };
        } else {
            prevPage = { page: (currentPage - 1), active: false };
        }

        if (currentPage == 1) {
            pages.push({ page: 1, active: true });
            firstPage = { page: 1, active: false };
        } else {
            pages.push({ page: 1, active: false });
            firstPage = { page: 1, active: true };
        }

        let paginate = this.calculatePages(totalPages, maxSize);
        if (paginate.left >= 3) {
            infinityPagesLeft = { active: false };
        }

        paginate.pages.map((page, index) => {
            pages.push(page);
        });

        if (currentPage == totalPages) {
            pages.push({ page: totalPages, active: true });
            lastPage = { page: totalPages, active: false };
        } else {
            pages.push({ page: totalPages, active: false });
            lastPage = { page: totalPages, active: true };
        }

        if ((totalPages - paginate.right) >= 2) {
            infinityPagesRight = { active: false };
        }

        if (currentPage < totalPages) {
            nextPage = { page: (currentPage + 1), active: true };
        } else {
            nextPage = { page: (currentPage + 1), active: false };
        }

        return (
            <div className="row fixed-table-pagination-row">
                <div className="fixed-table-pagination">
                    <div className="pull-left pagination-detail">
                        <PageSize fromPage={pageSizeConfig.fromPage}
                                    toPage={pageSizeConfig.toPage}
                                    totalCount={this.props.totalCount}
                                    onPageSize={this.onSelectPageSize}
                                    limits={this.props.pageSize}
                                    selected={this.state.itemsPerPage}/>
                    </div>

                    <div className="pull-right pagination">
                        <nav className={this.props.position}>
                            <ul className="pagination">
                                <BoundaryPageLink active={firstPage.active} label={this.props.firstText} page={firstPage.page} onPage={this.onSelectPage}/>

                                <BoundaryPageLink active={prevPage.active} label={this.props.previousText} page={prevPage.page} onPage={this.onSelectPage}/>

                                {infinityPagesLeft ? (<BoundaryPageLink active={false} label="..."/>) : ''}

                                {pages.map((item, index) => {
                                    return (<PageLink key={index} page={item.page} active={item.active} onPage={this.onSelectPage}/>);
                                })}

                                {infinityPagesRight ? (<BoundaryPageLink active={false} label="..."/>) : ''}

                                <BoundaryPageLink active={nextPage.active} label={this.props.nextText} page={nextPage.page} onPage={this.onSelectPage}/>

                                <BoundaryPageLink active={lastPage.active} label={this.props.lastText} page={lastPage.page} onPage={this.onSelectPage}/>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
});


let PageLink = React.createClass({

    getDefaultProps() {
        return {
            page: 0,
            active: false
        };
    },

    onChangePage() {
        if (this.props.onPage) {
            this.props.onPage(this.props.page);
        }
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

    getDefaultProps() {
        return {
            page: 0,
            label: '',
            active: false
        };
    },

    onChangePage() {
        if (this.props.onPage) {
            this.props.onPage(this.props.page);
        }
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


let PageSize = React.createClass({

    getDefaultProps() {
        return {
            selected: 0,
            fromPage: 0,
            toPage: 0,
            totalCount: 0,
            limits: []
        }
    },

    _onChange(e) {
        if (this.props.onPageSize) {
            this.props.onPageSize(new PageEvent(this.props.fromPage,
                                                    parseInt(e.target.value),
                                                    this.props.fromPage,
                                                    this.props.toPage));
        }

        this.setState({});
    },

    render() {
        let items = this.props.limits.map((size, index) => {
            return (<option key={index} value={size}>{size}</option>)
        });

        return (
            <div className="page-size-info">
                <span className="pagination-info"> Exibindo {this.props.fromPage} até {this.props.toPage} de {this.props.totalCount} registros </span>
                <span className="page-list">
                    <span className="btn-group dropup">
                        <select className="form-control" onChange={this._onChange} value={this.props.selected}>
                            {items}
                        </select>
                    </span>
                </span>
            </div>
        );
    }

});


class PageEvent {

    constructor(npage, nlimit, nfrom, nto) {
        this._page = npage;
        this._limit = nlimit;
        this._from = nfrom;
        this._to = nto;
    }

    get page() {
       return this._page;
    }

    get limit() {
       return this._limit;
    }

    get from() {
       return this._from;
    }

    get to() {
       return this._to;
    }

    toString() {
       return `${this._page} ${this._limit} ${this._from} ${this._to}`;
    }

};


export default Pagination;
