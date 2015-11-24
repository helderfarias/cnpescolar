'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import request from 'superagent';
import assign from 'object-assign';

let _token = localStorage.getItem('gestoken');
let _erros = [];

function autenticar(credencias, cb) {
    _erros = [];

    if (!credencias || !credencias.login || !credencias.senha) {
        _erros = [ { texto: 'Credências inválida' }];
        return cb();
    }

    request.post(Config.Seguranca.auth('/token'))
           .send({ username: credencias.login, password: credencias.senha })
           .set('Accept', 'application/json')
           .set('Authorization', montarHashClientCredencials())
           .end(function(err, res){
               if (!err) {
                   localStorage.setItem('gestoken', res.text);
               }
               cb();
           });
}

function removerToken() {
    localStorage.removeItem('gestoken');
    _erros = [];
}

function montarHashClientCredencials() {
    let credenciais = Config.ClientCredencials.id + ':' + Config.ClientCredencials.secret;

    return 'Basic ' + new Buffer(credenciais).toString('base64');
}

let LoginStore = assign({}, EventEmitter.prototype, {

    getToken() {
        return _token;
    },

    getErros() {
        return _erros;
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
            autenticar(action.credencias, function() {
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
