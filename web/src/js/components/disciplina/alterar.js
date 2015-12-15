'use strict';

import React from 'react';
import { Link, History } from 'react-router';
import DisciplinaAction from '../../actions/disciplina_action';
import DisciplinaStore from '../../stores/disciplina_store';
import Growl from '../comuns/alert';

export default React.createClass({
    mixins: [ History ],

    handleSubmit(e) {
        e.preventDefault();

        let disciplina = this.state.disciplina || {}

        disciplina.nome = this.refs.nome.value;

        DisciplinaAction.alterar(disciplina);
    },

    getInitialState() {
        return this.getStateFromStore();
    },    

    getStateFromStore(props) {
        const { id } = props ? props.params : this.props.params

        return {
            disciplina: DisciplinaStore.getDisciplina(id)
        }
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

        this.setState(this.getStateFromStore());

        Growl.notifyOnErrors(DisciplinaStore.getErros());
    },
   
    render() {
        const disciplina = this.state.disciplina || {}

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3 className="page-header">Disciplina - Alterar</h3>
                    </div>
                </div>

                <div className="row">
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
                                                   <input type="text" className="form-control" ref="nome" id="nome" placeholder="Nome" defaultValue={disciplina.nome} autoFocus/>
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