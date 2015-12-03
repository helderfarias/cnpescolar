'use strict';

import React from 'react';

let Button = React.createClass({

    getDefaultProps() {
        return {
            icon: '',
            name: '',
            target: {}
        }
    },

    render() {
        return (
            <button type="button" className="btn btn-default btn-md btn-space" onClick={this._onClick}>
                <i className={this.props.icon}></i>
            </button>
        );
    },

    _onClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.target);
        }
    }

});

export default Button;
