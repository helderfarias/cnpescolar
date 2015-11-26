'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import Modal from '../modal';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import DataTable from '../comuns/data_table';
import Pagination from '../comuns/pagination';

let DisciplinaListagem = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            itensPorPagina: 5,
            disciplinas: DisciplinaStore.getDisciplinas(),
        }
    },

    componentDidMount() {
        DisciplinaStore.addChangeListener(this.onChangeListener);
        DisciplinaAction.filtrarPor({ nome: 'Helder' });
    },

    componentWillUnmount() {
        DisciplinaStore.removeChangeListener(this.onChangeListener);
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

    onChangeListener() {
        // this.setState({ disciplinas: DisciplinaStore.getDisciplinas() });
        var json = require("json!../../sources/disciplinas.json");
        this.setState({ disciplinas: json });
    },

    paginar(pagina) {
        this.setState({});
    },

    alterarNumeroPaginas(tamanho) {
        this.setState({ itensPorPagina: tamanho });
    },

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">List</h3>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading clearfix">
                                <div className="btn-group pull-right">
                                    <Link to="/disciplina/novo" className="btn btn-default btn-md"><i className="fa fa-plus-circle"></i> </Link>
                                    <a className="btn btn-default btn-md" onClick={this.openFiltro}><i className="fa fa-filter"></i> </a>
                                </div>
                            </div>

                            <div className="panel-body clearfix">
                                <DataTable source={this.state.disciplinas}
                                            columns={[ { name: 'id', title: '#' }, { name: 'nome', title: 'Nome' }]}/>
                            </div>

                            <div className="panel-footer">
                                <Pagination position={'right'}
                                            itemsPerPage={this.state.itensPorPagina}
                                            totalCount={this.state.disciplinas.length}
                                            onChangePage={this.paginar}
                                            onChangePageSize={this.alterarNumeroPaginas} />
                            </div>
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
