'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import Dialog from '../comuns/dialog';
import Button from '../comuns/button';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import TableRow from '../comuns/table';
import Pagination from '../comuns/pagination';

export default React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            pagina: 1,
            itensPorPagina: 10,
            total:  DisciplinaStore.getTotalRegistro(),
            disciplinas: DisciplinaStore.getDisciplinas(),
        }
    },

    componentDidMount() {
        DisciplinaStore.addChangeListener(this.onChangeListener);

        DisciplinaAction.filtrarPor();
    },

    componentWillUnmount() {
        DisciplinaStore.removeChangeListener(this.onChangeListener);
    },

    onChangeListener() {
        this.setState({
            pagina: this.state.pagina,
            total:  DisciplinaStore.getTotalRegistro(),
            itensPorPagina: this.state.itensPorPagina,
            disciplinas: DisciplinaStore.getDisciplinas()
        });
    },

    paginar(e) {
        let criterios = {
            nome: this.refs.nome.value.trim(),
            pagina: e.page,
            limite: e.limit
        };

        DisciplinaAction.filtrarPor(criterios);
    },

    abrirFiltro() {
        this.refs.filtro.open();
    },    

    aplicarFiltro(e) {
        if (!e.ok) {
            return false;
        }

        let criterios = {
            nome: this.refs.nome.value.trim(),
            pagina: 1,
            limite: 10
        };

        DisciplinaAction.filtrarPor(criterios);
        this.refs.nome.value = null;
        this.refs.page.update(criterios.pagina, criterios.limite);
    },    

    excluir(disciplina) {
        this.refs.exclusao.open({ 
            text: 'Deseja realmente excluir "' + disciplina.nome +'"?', 
            target: disciplina
        });
    },

    confirmarExclusao(e) {   
        if (!e.ok) {
            return false;
        }

        DisciplinaAction.excluir(e.target);
    },

    render() {
        let rows = this.state.disciplinas.map((row, rowIndex) => {
            return (
                <TableRow key={rowIndex}>
                    <td>{row.id}</td>
                    <td>{row.nome}</td>
                    <td className="col-xs-2 col-md-2 col-lg-1">
                        <Link to={`/disciplina/alterar/${row.id}`} className="btn btn-default btn-md btn-space"><i className="fa fa-pencil"></i> </Link>
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
                                    <a className="btn btn-default btn-md" onClick={this.abrirFiltro}><i className="fa fa-filter"></i> </a>
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
                                <Pagination ref="page"
                                            position={'right'}
                                            pageSize={[3, 5, 10, 20, 30, 40, 50, 100]}
                                            totalCount={this.state.total}
                                            onChangePage={this.paginar}
                                            initialItemsPerPage={this.state.itensPorPagina} />
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog ref="filtro" 
                        title="Filtro"
                        okLabel="Aplicar"
                        onClose={this.aplicarFiltro}>
                    <form className="form-horizontal" role="form">
                        <div className="form-group">
                            <label className="control-label col-sm-1">Nome </label>
                            <div className="col-sm-11">
                                <input type="nome" className="form-control" id="nome" placeholder="Nome" ref="nome"/>
                            </div>
                        </div>
                    </form>
                </Dialog>

                <Dialog ref="exclusao" 
                        onClose={this.confirmarExclusao} />
            </div>
        );
    }

});