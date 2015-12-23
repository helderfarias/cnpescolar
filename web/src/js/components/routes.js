import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './app';
import NavigatorHandler from './nav';
import Home from './home';
import LoginStore from '../stores/login_store';
import Login from './autenticacao/login';
import { DisciplinaListar, DisciplinaNovo, DisciplinaAlterar }  from './disciplina';
import { CursoListar, CursoNovo, CursoAlterar }  from './curso';
import { TurmaListar }  from './turma';

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
            <Route path="/disciplinas/novo" component={DisciplinaNovo} onEnter={flowAuth}/>
            <Route path="/disciplinas/alterar/:id" component={DisciplinaAlterar} onEnter={flowAuth}/>
            <Route path="/cursos" component={CursoListar} onEnter={flowAuth}/>
            <Route path="/cursos/novo" component={CursoNovo} onEnter={flowAuth}/>
            <Route path="/cursos/alterar/:id" component={CursoAlterar} onEnter={flowAuth}/>
            <Route path="/turmas" component={TurmaListar} onEnter={flowAuth}/>
        </Route>
    </Router>
);
