'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class TableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.props = { title: '', cols: '' };
        this.state = { rows: [] };
    }

    onRow(r) {
        this.setState({ rows: r });
    }

    render() {
        let cols = this.props.cols.split(',').map(col => {
            return <th key={col}>{col}</th>;
        });

        let rows = this.state.rows.map(row => {
            let cells = [];
            for (let i in row) {
                cells.push(<td key={i}>{row[i]}</td>);
            }
            return <tr key={row.id}>{cells}</tr>;
        });

        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">{this.props.title}</h3>
                </div>

                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading clearfix">
                            <div className="btn-group pull-right">
                                {this.props.children}
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead><tr>{cols}</tr></thead>
                                <tbody>{rows}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

TableComponent.displayName = 'TableComponent';

export default TableComponent;
