'use strict';

import React from 'react';

let DataTable = React.createClass({

    getInitialState() {
        return {
            selectedRows: false
        }
    },

    getDefaultProps() {
        return {
            numberOfPages: 10,
            totalItems: 0
        }
    },

    selectAllRows(cb) {
        if (cb) {
            cb();
        }

        this.setState({ selectedRows: !this.state.selectedRows })
    },

    createColumns() {
        if (this.isEmptyList(this.props.columns)) {
            console.error('columns is empty');
            return (<th></th>);
        }

        let cols = [];

        cols.push((
            <th key={0}>
                <input type="checkbox" name="selectAll" value="#" onClick={this.selectAllRows}/>
            </th>
        ));

        for (var index = 0; index < this.props.columns.length; index++) {
            let column = this.props.columns[index];
            cols.push((<th key={index + 1}>{column.title}</th>));
        }

        return cols;
    },

    createRows() {
        if (this.isEmptyList(this.props.columns)) {
            console.error('columns is empty');
            return (<tr></tr>);
        }

        if (this.isEmptyList(this.props.source)) {
            return (<tr></tr>);
        }

        let rows = this.props.source.map((row, rowIndex) => {
            return (<TableRow key={rowIndex}
                                value={row}
                                columns={this.props.columns}
                                initialSelected={this.state.selectedRows}
                                onChageRow={this.chageRow}/>);
        });

        return rows;
    },

    isEmptyList(list) {
        if (!list) {
            return true;
        }
        return list.length === 0;
    },

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-condensed table-hover">
                    <thead>
                        <tr>{this.createColumns()}</tr>
                    </thead>
                    <tbody>{this.createRows()}</tbody>
                </table>
            </div>
        );
    }

});

let TableRow = React.createClass({

    getInitialState() {
        return {
            selection: false
        }
    },

    getDefaultProps() {
        return {
            value: {},
            columns: []
        }
    },

    componentDidMount() {
        this.props.onSelectRow(this._onChange);
    },

    _onChange() {
        console.log('ok');
    },

    selectRow(e) {
        this.setState({ selection: !this.state.selection })
    },

    render() {
        let checked = (this.props.initialSelected || this.state.selection);

        let items = [];

        items.push((
            <td key={0} className="table-columns-selection">
                <input type="checkbox" onClick={this.selectRow} checked={checked}/>
            </td>
        ));

        for (let index = 0; index < this.props.columns.length; index++) {
            let column = this.props.columns[index];

            items.push((<td key={index + 1}>{this.props.value[column.name]}</td>));
        }

        return (<tr className={checked ? 'selected' : 'deselected'}>{items}</tr>);
    }

});

export default DataTable;
