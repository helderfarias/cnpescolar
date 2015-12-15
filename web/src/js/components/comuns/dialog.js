'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({

    getInitialState() {
        return {
            text: '',
            target: {},
            dialog: {}
        }
    },

    componentDidMount() {
       let dialog = $(ReactDOM.findDOMNode(this.refs.modal));

       this.setState({ dialog: dialog });
    },

    ok() {
        if (this.props.onClose) {
            this.props.onClose({ ok: true, target: this.state.target });
            this.state.dialog.modal('hide');
        }
    },

    cancel() {
        if (this.props.onClose) {
            this.props.onClose({ ok: false, target: this.state.target });
            this.state.dialog.modal('hide');
        }
    },

    open(e) {
        const text = (e && e.text) ? e.text : '';
        const target = (e && e.target) ? e.target : null;

        this.setState({ text: text, target: target });

        this.state.dialog.modal('show');
    },

    render() {
        const title = this.props.title ? this.props.title : 'Atenção!';
        const text = this.state.text ? this.state.text.toString() : 'Você tem certeza?';
        const ok = this.props.okLabel ? this.props.okLabel : 'OK';
        const cancel = this.props.cancelLabel ? this.props.cancelLabel : 'Cancelar';

        return (
            <div className="modal fade" ref="modal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{title}</h4>
                        </div>

                        <div className="modal-body">
                            {this.props.children || text}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={this.ok}>{ok}</button>
                            <button type="button" className="btn btn-default" onClick={this.cancel}>{cancel}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});