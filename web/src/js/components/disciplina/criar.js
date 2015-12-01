'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import AlertMessage from '../comuns/alert';

let DisciplinaNovo = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return { erros: [] };
    },

    handleSubmit(e) {
        e.preventDefault();

        let disciplina = {
            nome: this.refs.nome.value
        };

        DisciplinaAction.salvar(disciplina);
    },

    componentDidMount() {
        DisciplinaStore.addChangeListener(this.onChangeListener);
    },

    componentWillUnmount() {
        DisciplinaStore.removeChangeListener(this.onChangeListener);
    },

    onChangeListener() {
        if (DisciplinaStore.getErros().length === 0) {
            this.history.replaceState(null, '/disciplinas');
            return;
        }

        this.setState({ erros: DisciplinaStore.getErros() });
    },

    onAlertClose() {
        this.setState({ erros: [] });
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="page-header">Disciplina - Novo</h3>
                    </div>
                </div>

                <div className="row">
                    <AlertMessage source={this.state.erros} severity='danger' onClose={this.onAlertClose}/>

                   <div className="col-lg-12">
                       <div className="panel panel-default">
                           <div className="panel-heading">
                               Dados da disciplina
                           </div>

                           <div className="panel-body">
                               <div className="row">
                                   <div className="col-lg-6">
                                       <form className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                                           <div className="form-group">
                                               <label className="control-label col-sm-2">Nome </label>
                                               <div className="col-sm-10">
                                                   <input type="text" className="form-control" ref="nome" id="nome" placeholder="Nome"/>
                                               </div>
                                           </div>
                                           <div className="form-group">
                                               <div className="col-sm-offset-2 col-sm-10">
                                                   <button type="submit" className="btn btn-success">Confirmar</button>
                                                   <span>&nbsp;</span>
                                                   <Link to="/disciplinas" className="btn btn-default">Cancelar</Link>
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

export default DisciplinaNovo;
