'use strict';

import React from 'react';

let AlertMessage = React.createClass({

    propTypes: {
       onClose: React.PropTypes.func,
       source: React.PropTypes.array,
       severity: React.PropTypes.string
    },

    getDefaultProps() {
        return {
          source: [],
          severity: 'danger'
        };
    },

    isNotValidSeverity() {
        return this.props.severity != 'danger' &&
                this.props.severity != 'info'   &&
                this.props.severity != 'warning';
    },

    isEmpty() {
        return !this.props.source || this.props.source.length === 0;
    },

    render() {
        if (this.isNotValidSeverity()) {
            throw Error('A propriedade [severity] deve ser: danger, info ou warning');
        }

        if (this.isEmpty()) {
            return (<span></span>);
        }

        let level = 'alert ' + 'alert-'+this.props.severity + ' alert-dismissable';

        return (
            <div className={level}>
                <button type="button" className="close" aria-hidden="true" onClick={this.props.onClose}>×</button>
                <ul>
                    {this.props.source.map(function(m) {
                        return (<li key={m}>{m.texto}</li>);
                    })}
                </ul>
            </div>
        );
    }

});

export default AlertMessage;
