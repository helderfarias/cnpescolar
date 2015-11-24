'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';

let LoginAction = {

    login: function(login, senha) {
        Dispatcher.dispatch({
            actionType: Eventos.Autenticacao.LOGIN,
            credencias: { login: login, senha: senha }
        });
    },

    logout: function() {
        Dispatcher.dispatch({
            actionType: Eventos.Autenticacao.LOGOUT
        });
    }

};

export default LoginAction;
