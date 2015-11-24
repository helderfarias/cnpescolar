'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import Modal from '../modal';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';

let DisciplinaListagem = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            disicplinas: DisciplinaStore.getDisciplinas()
        }
    },

    componentDidMount() {
        DisciplinaStore.addChangeListener(this._onChange);
        DisciplinaAction.filtrarPor({ nome: 'Helder' });
    },

    componentWillUnmount() {
        DisciplinaStore.removeChangeListener(this._onChange);
    },

    openFiltro() {
        this.refs.filtro.open();
    },

    onFilter() {
        let filtro = {
            nome: this.refs.nome.value.trim()
        };

        DisciplinaAction.filtrarPor(filtro);
        this.refs.nome.value = null;
        this.refs.filtro.close();
    },

    _onChange() {
        this.setState({ disicplinas: DisciplinaStore.getDisciplinas() });
    },

    render() {
        let rows = this.state.disicplinas.map(function(item, index) {
            return (<tr key={index}><td>{item.id}</td><td>{item.nome}</td></tr>);
        });

        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">List</h3>
                </div>

                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading clearfix">
                            <div className="btn-group pull-right">
                                <Link to="/disciplina/novo" className="btn btn-default btn-md"><i className="fa fa-plus-circle"></i> </Link>
                                <a className="btn btn-default btn-md" onClick={this.openFiltro}><i className="fa fa-filter"></i> </a>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Modal ref="filtro" onFilter={this.onFilter}>
                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="control-label col-sm-1">Nome </label>
                            <div className="col-sm-11">
                                <input type="nome" className="form-control" id="nome" placeholder="Nome" ref="nome"/>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }

});

export default DisciplinaListagem;
