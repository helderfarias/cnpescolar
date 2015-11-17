var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var App = require('./components/app');
var Disciplinas = require('./components/disciplina/disciplinas');

ReactDOM.render((
    <Router>
        <Route path="/" component={App}>
          <Route path="disciplinas" component={Disciplinas}>
          </Route>
        </Route>
    </Router>
), document.getElementById('app'));
