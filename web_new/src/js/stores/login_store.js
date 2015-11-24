'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import request from 'superagent';
import assign from 'object-assign';

let _store = {
    token: ''
};

function montarHashClientCredencials() {
    let credenciais = Config.ClientCredencials.id + ':' + Config.ClientCredencials.secret;

    return 'Basic ' + new Buffer(credenciais).toString('base64');
}

function autenticar(credencias, cb) {
    request.post(Config.Seguranca.auth('/token'))
           .send({ username: credencias.login, password: credencias.senha })
           .set('Accept', 'application/json')
           .set('Authorization', montarHashClientCredencials())
           .end(function(err, res){
               if (!err) {
                   localStorage.setItem('gestoken', res.text);
               }

               cb(err, res);
           });
}

function removerToken() {
    localStorage.removeItem('gestoken');
}

let LoginStore = assign({}, EventEmitter.prototype, {

    getToken() {
        return _store.token;
    },

    isLoggedIn() {
        return !!localStorage.getItem('gestoken');
    },

    emitChange() {
        this.emit('change');
    },

    addChangeListener(cb) {
        this.on('change', cb);
    },

    removeChangeListener(cb) {
        this.removeListener('change', cb);
    }
});

Dispatcher.register(function(action) {
    switch (action.actionType) {
        case Eventos.Autenticacao.LOGIN:
            autenticar(action.credencias, function(err, res) {
                LoginStore.emitChange();
            });
            break;

        case Eventos.Autenticacao.LOGOUT:
            removerToken();
            LoginStore.emitChange();
            break;

        default:
            return true;
    }
});

export default LoginStore;
