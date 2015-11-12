import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, History } from 'react-router';
import { createHistory, useBasename } from 'history';

import Dashboard from './DashboardComponent'
import App from './Main';

const history = useBasename(createHistory)({
  basename: '/'
})

const routes = (
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
