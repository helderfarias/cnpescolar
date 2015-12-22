'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import CursoAction from '../../actions/curso_action';
import CursoStore from '../../stores/curso_store';
import Growl from '../comuns/alert';

export default React.createClass({
    mixins: [ History ],

    handleSubmit(e) {
        e.preventDefault();

        let curso = {
            nome: this.refs.nome.value,
            nivel: this.refs.nivel.value
        };

        CursoAction.salvar(curso);
    },

    componentDidMount() {
        CursoStore.addChangeListener(this.onChangeListener);
    },

    componentWillUnmount() {
        CursoStore.removeChangeListener(this.onChangeListener);
    },

    onChangeListener() {
        if (CursoStore.getErros().length === 0) {
            this.history.replaceState(null, '/cursos');
            return;
        }

        Growl.notifyOnErrors(CursoStore.getErros());
    },

    render() {
        const niveis = CursoStore.getNiveis().map((n, i) => {
            return (<option key={i} value={n.id}>{n.nome}</option>);
        });

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="page-header">Curso - Novo</h3>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading"> Dados da curso </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2">Nome </label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="nome" id="nome" placeholder="Nome" autoFocus/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2">Nível </label>
                                                <div className="col-sm-6">
                                                    <select className="form-control" ref="nivel">{niveis}</select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-sm-offset-2 col-sm-10">
                                                    <button type="submit" className="btn btn-success">Confirmar</button>
                                                    <span>&nbsp;</span>
                                                    <Link to="/cursos" className="btn btn-default">Cancelar</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        );
    }

});
