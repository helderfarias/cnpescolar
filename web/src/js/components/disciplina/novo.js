'use strict';

var React = require('react');
var Link = require('react-router').Link;
var ReactDOM = require('react-dom');

var DisciplinaStore = require('../../stores/disciplinastore');
var DisciplinaAction = require('../../actions/disciplinaaction');
var NavigatorHandler = require('../nav');

var DisciplinaNovo = React.createClass({

    salvar: function(e) {
        // e.preventDefault();
        NavigatorHandler.goTo('/disciplinas');
    },

    render: function() {
        return (
            <div>
                   <div className="row">
                     <div className="col-lg-12">
                         <h3 className="page-header">Disciplina - Novo</h3>
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
                                           <form className="form-horizontal" role="form">
                                               <div className="form-group">
                                                   <label className="control-label col-sm-2">Nome </label>
                                                   <div className="col-sm-10">
                                                       <input type="text" className="form-control" id="nome" placeholder="Nome"/>
                                                   </div>
                                               </div>
                                               <div className="form-group">
                                                   <div className="col-sm-offset-2 col-sm-10">
                                                       <button type="submit" className="btn btn-success" onClick={this.salvar}>Confirmar</button>
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

module.exports = DisciplinaNovo;
