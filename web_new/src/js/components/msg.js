'use strict';

var React = require('react');

var AlertMessage = React.createClass({

    propTypes: {
       onClose: React.PropTypes.func,
       rendered: React.PropTypes.bool,
       severity: React.PropTypes.string
    },

    getDefaultProps() {
        return {
          rendered: false,
          severity: 'danger'
        };
    },

    render: function() {
        if (this.props.severity != 'danger' &&
            this.props.severity != 'info'   &&
            this.props.severity != 'warning') {
            throw Error("A propriedade [severity] deve ser: danger, info ou warning");
        }

        if (!this.props.rendered) {
            return (<span></span>);
        }

        const level = 'alert ' + 'alert-'+this.props.severity + ' alert-dismissable';

        return (
            <div className={level}>
                <button type="button" className="close" aria-hidden="true" onClick={this.props.onClose}>×</button>
                {this.props.children}
            </div>
        );
    }

});

module.exports = AlertMessage;
