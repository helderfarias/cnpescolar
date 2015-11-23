'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import request from 'superagent';
import when from 'when';
import assign from 'object-assign';

let _store = {
    token: ''
};

function realizarLogin(credencias, cb) {
    request.post(Config.seguranca.auth('/token'))
           .send({ username: credencias.login, password: credencias.senha })
           .set('Accept', 'application/json')
           .set('Authorization', 'Basic Y2xpZW50aWQ6Y2xpZW50aWQwMA==')
           .end(function(err, res){
               cb(err, res);
           });
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
        case Eventos.LOGIN:
            realizarLogin(action.credencias, function(err, res) {
                if (err) {
                    alert("There's an error logging in");
                    console.log("Error logging in", err);
                    return;
                }

                localStorage.setItem('gestoken', res.text);
                LoginStore.emitChange();
            });
            break;

        default:
            return true;
    }
});

export default LoginStore;
