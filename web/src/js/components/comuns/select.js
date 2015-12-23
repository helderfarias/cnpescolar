'use strict';

import React from 'react';

export default React.createClass({

    getInitialState() {
        return { selected: null };
    },

    selected() {
        if (this.state.selected) {
            return this.state.selected;
        }

        let id = this.props.trackById;
        let label = this.props.trackByLabel;
        return this.props.options[0][id];
    },

    render() {
        let options = this.props.options || this.props.children;
        let defaultValue = this.props.initialValue || null;

        if (this.props.options) {
            let id = this.props.trackById;
            let label = this.props.trackByLabel;

            options = this.props.options.map((o, i) => {
                return (<option key={i} value={o[id]}>{o[label]}</option>);
            });
        }

        return (
            <select className="form-control"
                    defaultValue={defaultValue}
                    onChange={this._onChange}>
                {options}
            </select>
        );
    },

    _onChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }

        this.setState({ selected: e.target.value });
    }

});
