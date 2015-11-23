import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './app';
import NavigatorHandler from './nav';
import Home from './home';
import AutenticacaoAction from '../actions/autenticacao_action';
import Login from './autenticacao/login';
import DisciplinaListagem from './disciplina/listar';
import DisciplinaNovo from './disciplina/criar';

const history = useBasename(createHistory)({
    basename: '/ges'
});

function flowAuth(nextState, replaceState) {
    if (nextState.location.pathname != '/login' && !AutenticacaoAction.loggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
}

export default (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} onEnter={flowAuth}/>
            <Route path="/login" component={Login}/>
            <Route path="/disciplinas" component={DisciplinaListagem} onEnter={flowAuth}/>
            <Route path="/disciplina/novo" component={DisciplinaNovo} onEnter={flowAuth}/>
        </Route>
    </Router>
);
