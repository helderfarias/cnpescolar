'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import LoginService from '../services/login_service';

var service = new LoginService();

let Store = assign({}, EventEmitter.prototype, {

    getToken() {
        return service.token;
    },

    getErros() {
        return service.erros;
    },

    isLoggedIn() {
        return !!service.token;
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
            service.autenticar(action.credencias, () => { Store.emitChange(); });
            break;

        case Eventos.Autenticacao.LOGOUT:
            service.revogar(() => { Store.emitChange(); });
            break;

        default:
            return true;
    }
});

export default Store;
