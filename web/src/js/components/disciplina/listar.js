'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import Modal from '../modal';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import TableRow from '../comuns/table';
import Button from '../comuns/button';
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
    },

    excluir(e) {
        console.log('excluir', e);
    },

    render() {
        let rows = this.state.disciplinas.map((row, rowIndex) => {
            return (
                <TableRow key={rowIndex}>
                    <td>{row.id}</td>
                    <td>{row.nome}</td>
                    <td className="col-xs-2 col-md-2 col-lg-1">
                        <Button target={row} icon={'fa fa-pencil'} onClick={this.alterar} />
                        <Button target={row} icon={'fa fa-trash'} onClick={this.excluir} />
                    </td>
                </TableRow>
            );
        });

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
                                <div className="table-responsive">
                                    <table className="table table-condensed table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nome</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>{rows}</tbody>
                                    </table>
                                </div>
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
