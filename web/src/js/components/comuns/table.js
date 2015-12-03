'use strict';

import React from 'react';

let TableRow = React.createClass({

    render() {
        return (
            <tr>{this.props.children}</tr>
        );
    }

});

export default TableRow;
