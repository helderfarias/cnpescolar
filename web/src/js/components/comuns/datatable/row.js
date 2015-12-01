'use strict';

import React from 'react';
import ActionButton from './action_button';

let Row = React.createClass({

    getInitialState() {
        return {
            selection: false
        }
    },

    getDefaultProps() {
        return {
            index: 0,
            value: {},
            columns: [],
            actions: []
        }
    },

    selectRow() {
        this.setState({ selection: !this.state.selection })
    },

    render() {
        let checked = this.state.selection;
        let items = [];

        items.push((
            <td key={0} className="table-columns-selection">
                <input type="checkbox" onClick={this.selectRow} checked={checked}/>
            </td>
        ));

        let actionButtons = this._createActionButtons();

        for (let index = 0; index < this.props.columns.length; index++) {
            let column = this.props.columns[index];
            let id = index + 1;

            if (!column.action) {
                items.push((<td key={id}>{this.props.value[column.name]}</td>));
            } else {
                items.push((<td key={id}>{actionButtons}</td>));
            }
        }

        return (<tr className={checked ? 'selected' : 'deselected'}>{items}</tr>);
    },

    _select() {
        this.setState({ selection: true });
    },

    _deselect() {
        this.setState({ selection: false });
    },

    _fireAction(name) {
        if (!name) {
            return;
        }

        let actionEvent = null;
        this._getActions().map((action, index) => {
            if (action.name === name) {
                actionEvent = action.event;
            }
        });

        if (actionEvent) {
            actionEvent({ row: this.props.index, value: this.props.value });
        }
    },

    _createActionButtons() {
        return this._getActions().map((button, idx) => {
            return (
                <ActionButton key={idx}
                              name={button.name}
                              icon={button.icon}
                              onAction={this._fireAction} />
            );
        });
    },

    _getActions() {
        let actions = [];

        this.props.columns.map((column, columnIndex) => {
            if (column.actions) {
                actions = column.actions;
            }
        });

        return actions;
    },

});

export default Row;
