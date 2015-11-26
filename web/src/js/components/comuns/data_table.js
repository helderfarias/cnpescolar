'use strict';

import React from 'react';

let DataTable = React.createClass({

    propTypes: {
       numberOfPages: React.PropTypes.number,
       totalItems: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            numberOfPages: 10,
            totalItems: 0
        }
    },

    renderHeaderChildren() {
        return React.Children.map(this.props.children, function(child) {
            if (child.type === DataTableHeaderBar.type) {
                return React.cloneElement(child, { name: this.props.name });
            }

            return child
        }.bind(this));
    },

    renderFooterChildren() {
        return React.Children.map(this.props.children, function(child) {
            if (child.type === DataTableFooterBar.type) {
                return React.cloneElement(child, { name: this.props.name });
            }

            return child
        }.bind(this));
    },

    createColumns() {
        if (this.isEmptyList(this.props.columns)) {
            console.error('columns is empty');
            return (<th></th>);
        }

        let cols = this.props.columns.map((column, index) => {
            return (<th key={index}>{column.title}</th>);
        });

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
            let columns =  this.props.columns.map((column, columnIndex) => {
                return (<td key={columnIndex}>{row[column.name]}</td>)
            });

            return (<tr key={rowIndex}>{columns}</tr>);
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
            <div className="panel panel-default">
                <div className="panel-heading clearfix">
                    {this.renderHeaderChildren()}
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>{this.createColumns()}</tr>
                        </thead>
                        <tbody>{this.createRows()}</tbody>
                    </table>
                </div>

                {this.renderFooterChildren()}
            </div>
        );
    }

});

let DataTableHeaderBar = React.createClass({

    getInitialState() {
       return { position: 'right' };
    },

    render() {
        const styleClass = 'btn-group pull-' + this.props.position;

        return (
            <div className={styleClass}>
                {this.props.children}
            </div>
        );
    }

});

let DataTableFooterBar = React.createClass({

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }

});

exports.DataTable = DataTable;
exports.DataTableHeaderBar = DataTableHeaderBar;
exports.DataTableFooterBar = DataTableFooterBar;
