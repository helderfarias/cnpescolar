'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, History } from 'react-router';
import ModalFilter from '../../ModalComponent';
import Table from '../../TableComponent';

let DisciplinaStore = require('../../../stores/DisciplinaStore');

class DisciplinaListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disciplinas: DisciplinaStore.getDisciplinas()
        }
    }

    componentDidMount() {
        DisciplinaStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        DisciplinaStore.removeChangeListener(this._onChange);
    }

    openFiltro() {
        this.refs.modal.open();
    }

    onFiltro() {
        this.refs.table.onRow([{'id': 1, 'nome': 'Helder'}, {'id': 2, 'nome': 'Helder'}])
        this.refs.modal.close();
    }

    render() {
        console.log(DisciplinaStore);

        return (
            <Table ref="table" title='Disciplinas' cols='#,Nome'>
                <Link to="/disciplina/novo" className="btn btn-default btn-md"><i className="fa fa-plus-circle"></i> </Link>
                <a className="btn btn-default btn-md" onClick={this.openFiltro.bind(this)}><i className="fa fa-filter"></i> </a>

                <ModalFilter ref="modal" onFilter={this.onFiltro.bind(this)}>
                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="control-label col-sm-1">Nome </label>
                            <div className="col-sm-11">
                                <input type="nome" className="form-control" id="nome" placeholder="Nome" ref="nome"/>
                            </div>
                        </div>
                    </form>
                </ModalFilter>
            </Table>
        );
    }

}

DisciplinaListComponent.displayName = 'DisciplinaListComponent';

export default DisciplinaListComponent;
