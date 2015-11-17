'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Modal = React.createClass({

    ok: function(e) {
        if (this.props.onFilter) {
            this.props.onFilter();
        }
    },

    open: function() {
        $(ReactDOM.findDOMNode(this.refs.modal)).modal("show");
    },

    close: function() {
        $(ReactDOM.findDOMNode(this.refs.modal)).modal("hide");
    },

    render: function() {
        return (
            <div className="modal fade" id="modal" ref="modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Fitro</h4>
                        </div>

                        <div className="modal-body">
                            {this.props.children}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={this.ok}>Aplicar</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Modal;
