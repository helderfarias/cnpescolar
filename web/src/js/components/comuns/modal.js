'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

let Modal = React.createClass({

    ok(e) {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.target);
        }
    },

    open(e) {
        $(ReactDOM.findDOMNode(this.refs.modal)).modal("show");
        this.setState({ target: e });
    },

    close() {
        $(ReactDOM.findDOMNode(this.refs.modal)).modal("hide");
    },

    render() {
        const title = this.props.title ? this.props.title : 'Filtro';
        const okLabel = this.props.labelOK ? this.props.labelOK : 'Aplicar';
        const cancelLabel = this.props.labelCancel ? this.props.labelCancel : 'Cancelar';

        return (
            <div className="modal fade" id="modal" ref="modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{title}</h4>
                        </div>

                        <div className="modal-body">
                            {this.props.children}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={this.ok}>{okLabel}</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">{cancelLabel}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

export default Modal;
