var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

var App = require('./app');
var NavigatorHandler = require('./nav');
var Login = require('./login');
var DisciplinaLista = require('./disciplina/lista');
var DisciplinaNovo = require('./disciplina/novo');
var AuthAction = require('../actions/authaction');

module.exports = (
    <Router history={NavigatorHandler.history()}>
        <Route path="/" component={App} onEnter={AuthAction.requireAuth}>
            <Route path="login" component={Login}/>
            <Route path="disciplinas" component={DisciplinaLista} onEnter={AuthAction.redirectAuth}/>
            <Route path="disciplina/novo" component={DisciplinaNovo} onEnter={AuthAction.requireAuth}/>
        </Route>
    </Router>
);
