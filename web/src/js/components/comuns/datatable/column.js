'use strict';

import React from 'react';

let Column = React.createClass({

    getDefaultProps() {
        return {
            align: 'left',
            width: 'auto',
            title: ''
        }
    },

    render() {
        return (
            <th width={this.props.width} className={this.props.align}>
                {this.props.children ? this.props.children : this.props.title}
            </th>
        );
    }

});

export default Column;
