'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class ModalFilter extends React.Component {

    ok() {
        this.props.onFilter();
    }

    open() {
        $(ReactDOM.findDOMNode(this.refs.modal)).modal("show");
    }

    close() {
        $(ReactDOM.findDOMNode(this.refs.modal)).modal("hide");
    }

    render() {
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
                            <button type="button" className="btn btn-success" onClick={this.ok.bind(this)}>Aplicar</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

ModalFilter.displayName = 'ModalFilter';

export default ModalFilter;
