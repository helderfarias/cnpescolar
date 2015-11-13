'use strict';

import React from 'react';
import { Router, Route, Link, History } from 'react-router';
import { createHistory, useBasename } from 'history';

import Dashboard from './DashboardComponent'
import Login from './LoginComponent'
import App from './Main';

const history = useBasename(createHistory)({
  basename: '/'
})

const AppRoutes = (
    <Router>
        <Route path="/" component={App}>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="login" component={Login}/>
        </Route>
    </Router>
);

export default AppRoutes;
