'use strict';

import React from 'react';
import Column from './column';
import Row from './row';

let DataTable = React.createClass({

    getInitialState() {
        return {
            allRowsSelected: false
        }
    },

    getDefaultProps() {
        return {
            actions: []
        }
    },

    selectAllRows() {
        let checked = !this.state.allRowsSelected;

        this.props.source.map((row, rowIndex) => {
            if (checked) {
                this.refs['dataTableRow' + rowIndex]._select();
            } else {
                this.refs['dataTableRow' + rowIndex]._deselect();
            }
        });

        this.setState({ allRowsSelected: checked });
    },

    render() {
        let totalCount = (this.props.source ? this.props.source.length : 0);

        return (
            <div className="table-responsive">
                <table className="table table-condensed table-hover">
                    <thead>
                        <tr>{this._createColumns()}</tr>
                    </thead>
                    <tbody>
                        {this._createRows()}
                    </tbody>
                </table>
            </div>
        );
    },

    _createColumns() {
        if (this._isEmptyList(this.props.columns)) {
            console.error('columns is empty');
            return (<th></th>);
        }

        let cols = [];

        cols.push((
            <Column key={0}>
                <input type="checkbox"
                        name="selectAll"
                        value={this.state.allRowsSelected}
                        onClick={this._selectAllRows}/>
            </Column>
        ));

        for (var index = 0; index < this.props.columns.length; index++) {
            let column = this.props.columns[index];

            cols.push((<Column key={index + 1}
                                width={column.width}
                                align={column.align}
                                title={column.title}
                                display={column.display} />));
        }

        return cols;
    },

    _createRows() {
        if (this._isEmptyList(this.props.columns)) {
            console.error('columns is empty');
            return (<tr></tr>);
        }

        if (this._isEmptyList(this.props.source)) {
            return (<tr></tr>);
        }

        let cols = this.props.columns.map((col, index) => {
            if (col.action) {
                col.actions = this.props.actions;
            }
            return col;
        });

        let rows = this.props.source.map((row, rowIndex) => {
            return (<Row key={rowIndex}
                            value={row}
                            index={rowIndex}
                            columns={cols} />);
        });

        return rows;
    },

    _isEmptyList(list) {
        if (!list) {
            return true;
        }
        return list.length === 0;
    }

});

export default DataTable;
