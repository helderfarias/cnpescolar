'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import Modal from '../modal';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import DataTable from '../comuns/datatable';
import Pagination from '../comuns/pagination';

let DisciplinaListagem = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            itensPorPagina: 10,
            total:  DisciplinaStore.getTotalRegistro(),
            disciplinas: DisciplinaStore.getDisciplinas(),
        }
    },

    componentDidMount() {
        DisciplinaStore.addChangeListener(this.onChangeListener);
    },

    componentWillUnmount() {
        DisciplinaStore.removeChangeListener(this.onChangeListener);
    },

    openFiltro() {
        this.refs.filtro.open();
    },

    onFilter() {
        let criterios = {
            nome: this.refs.nome.value.trim(),
            pagina: 1,
            limite: this.state.itensPorPagina
        };

        DisciplinaAction.filtrarPor(criterios);
        this.refs.nome.value = null;
        this.refs.filtro.close();
    },

    onChangeListener() {
        this.setState({
            pagina: 1,
            total:  DisciplinaStore.getTotalRegistro(),
            limite: this.state.itensPorPagina,
            disciplinas: DisciplinaStore.getDisciplinas()
        });
    },

    paginar(e) {
        this.setState({
            pagina: e.page,
            total:  DisciplinaStore.getTotalRegistro(),
            limite: this.state.itensPorPagina,
            disciplinas:  DisciplinaStore.getDisciplinas()
        });
    },

    alterar(e) {
        console.log('alterar', e);
        alert('Alterar: ' + e.value.id + ', ' + e.value.nome);
    },

    excluir(e) {
        console.log('excluir', e);
        alert('Excluir: ' + e.value.id + ', ' + e.value.nome);
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
                                            columns={[ {name: 'id', title: '#'},
                                                        {name: 'nome', title: 'Nome'},
                                                        {name: 'acoes', title: 'Ações', width: '100px', align: 'center', action: true} ]}
                                            actions={[  {name: 'alterar', icon: 'glyphicon glyphicon-pencil', event: this.alterar},
                                                        {name: 'excluir', icon: 'glyphicon glyphicon-trash', event: this.excluir} ]} />
                            </div>

                            <div className="panel-footer">
                                <Pagination position={'right'}
                                            pageSize={[3, 5, 10, 20, 30, 40, 50, 100]}
                                            totalCount={this.state.total}
                                            onChangePage={this.paginar}
                                            initialItemsPerPage={this.state.itensPorPagina} />
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
