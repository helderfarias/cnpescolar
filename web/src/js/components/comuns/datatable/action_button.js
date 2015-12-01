'use strict';

import React from 'react';

let ActionButton = React.createClass({

    getDefaultProps() {
        return {
            icon: '',
            name: ''
        }
    },

    render() {
        return (
            <button type="button"
                    className="btn btn-default btn-md btn-space"
                    onClick={this._fireAction}>
                <i className={this.props.icon}></i>
            </button>
        );
    },

    _fireAction() {
        if (this.props.onAction) {
            this.props.onAction(this.props.name);
        }
    }

});

export default ActionButton;
