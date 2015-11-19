var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var App = require('./app');
var NavigatorHandler = require('./nav');
var DisciplinaLista = require('./disciplina/lista');
var DisciplinaNovo = require('./disciplina/novo');

module.exports = (
    <Router history={NavigatorHandler.history()}>
        <Route path="/" component={App}>
            <Route path="disciplinas" component={DisciplinaLista}/>
            <Route path="disciplina/novo" component={DisciplinaNovo}/>
        </Route>
    </Router>
);
