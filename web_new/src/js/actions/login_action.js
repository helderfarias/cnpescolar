'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';

let LoginAction = {

    login: function(login, senha) {
        Dispatcher.dispatch({
            actionType: Eventos.LOGIN,
            credencias: { login: login, senha: senha }
        });
    }

};

export default LoginAction;
