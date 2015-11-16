'use strict';

import React from 'react';
import { Router, Route, Link, History } from 'react-router';
import { createHistory, useBasename } from 'history';

import Dashboard from './DashboardComponent';
import DisciplinaList from './cadastros/disciplina/DisciplinaListComponent';
import DisciplinaForm from './cadastros/disciplina/DisciplinaFormComponent';
import Login from './LoginComponent';
import App from './Main';

const history = useBasename(createHistory)({
  basename: '/'
})

const AppRoutes = (
    <Router>
        <Route path="/" component={App}>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="login" component={Login}/>
            <Route path="disciplinas" component={DisciplinaList}/>
            <Route path="disciplina/novo" component={DisciplinaForm}/>
        </Route>
    </Router>
);

export default AppRoutes;
