'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Modal = require('../modal');
var DisciplinaStore = require('../../stores/disciplinastore');
var DisciplinaAction = require('../../actions/disciplinaaction');

function getDisciplinaState() {
    return {
        disicplinas: DisciplinaStore.getAll()
    };
}

var Disciplinas = React.createClass({

    getInitialState: function() {
        return getDisciplinaState();
    },

    componentDidMount: function() {
        DisciplinaStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        DisciplinaStore.removeChangeListener(this._onChange);
    },

    openFiltro: function() {
        this.refs.filtro.open();
    },

    onFilter: function() {
        DisciplinaAction.getAll("text");
        this.refs.filtro.close();
    },

    render: function() {
        console.log(DisciplinaStore.getAll());

        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">Disciplinas</h3>
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
    },

    _onChange: function() {
        this.setState(getDisciplinaState());
    }

});

module.exports = Disciplinas;
