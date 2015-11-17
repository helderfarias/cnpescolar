'use strict';

var React = require('react');
var Link = require('react-router').Link;
var ReactDOM = require('react-dom');

var Modal = require('../modal');
var DisciplinaStore = require('../../stores/disciplinastore');
var DisciplinaAction = require('../../actions/disciplinaaction');

function getStates() {
    return {
        disicplinas: DisciplinaStore.obterTodas()
    };
}

var Disciplinas = React.createClass({

    getInitialState: function() {
        return getStates();
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
        var filtro = {
            nome: ReactDOM.findDOMNode(this.refs.nome).value.trim()
        };

        DisciplinaAction.filtrarPor({ nome: 'Helder' });

        ReactDOM.findDOMNode(this.refs.nome).value = null;

        this.refs.filtro.close();
    },

    _onChange: function() {
        this.setState(getStates());
    },

    render: function() {
        var rows = this.state.disicplinas.map(function(item, index) {
            return (<tr key={index}><td>{item.id}</td><td>{item.nome}</td></tr>);
        });

        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">List</h3>
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
                                    {rows}
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
    }

});

module.exports = Disciplinas;
