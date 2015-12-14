import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './app';
import NavigatorHandler from './nav';
import Home from './home';
import LoginStore from '../stores/login_store';
import Login from './autenticacao/login';
import { DisciplinaNovo, DisciplinaAlterar, DisciplinaListar }  from './disciplina';

const history = useBasename(createHistory)({
    basename: '/ges'
});

function flowAuth(nextState, replaceState) {
    if (nextState.location.pathname != '/login' && !LoginStore.isLoggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
}

export default (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} onEnter={flowAuth}/>
            <Route path="/login" component={Login}/>
            <Route path="/disciplinas" component={DisciplinaListar} onEnter={flowAuth}/>
            <Route path="/disciplina/novo" component={DisciplinaNovo} onEnter={flowAuth}/>
            <Route path="/disciplina/alterar/:id" component={DisciplinaAlterar} onEnter={flowAuth}/>
        </Route>
    </Router>
);
