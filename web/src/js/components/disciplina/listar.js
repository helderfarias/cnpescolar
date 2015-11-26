'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import Modal from '../modal';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import { DataTable, DataTableHeaderBar, DataTableFooterBar } from '../comuns/data_table';
import Pagination from '../comuns/pagination';

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
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">List</h3>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <DataTable source={this.state.disicplinas}
                                    columns={[ { name: 'id', title: '#' }, { name: 'nome', title: 'Nome' }]}
                                    numberOfPages={5}
                                    totalItems={100}>
                            <DataTableHeaderBar position={'right'}>
                                <Link to="/disciplina/novo" className="btn btn-default btn-md"><i className="fa fa-plus-circle"></i> </Link>
                                <a className="btn btn-default btn-md" onClick={this.openFiltro}><i className="fa fa-filter"></i> </a>
                            </DataTableHeaderBar>
                            <DataTableFooterBar>
                                <Pagination totalItems={100} numberOfPages={10}/>
                            </DataTableFooterBar>
                        </DataTable>
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
