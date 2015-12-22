'use strict';

import Config from '../constants/api';
import request from 'superagent';

export default class LoginService {

    constructor() {
        this._erros = [];
    }

    get erros() {
        return this._erros;
    }

    get token() {
        return localStorage.getItem('gestoken');
    }

    get usuario() {
        if (!this.token) {
            return {};
        }

        let parts = this.token.split('.', 2);
        let decoded = atob(parts[1]);
        let payload = JSON.parse(decoded);

        return {
            name: payload.name,
            login: payload.login,
            roles: payload.roles
        };
    }

    autenticar(credencias, cb) {
        this._erros = [];

        if (!credencias || !credencias.login || !credencias.senha) {
            this._erros = [ { text: 'Credências inválida' }];
            return cb();
        }

        request.post(Config.Seguranca.api('/token'))
               .send({ username: credencias.login, password: credencias.senha })
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/x-www-form-urlencoded')
               .set('Authorization', this.criarClienteCredencials())
               .end(function(err, res) {
                    if (!err) {
                        localStorage.setItem('gestoken', res.text);
                    }

                    cb();
               }.bind(this));
    }

    revogar(cb) {
        localStorage.removeItem('gestoken');
        this._erros = [];
        cb();
    }

    criarClienteCredencials() {
        let credenciais = Config.ClientCredencials.id + ':' + Config.ClientCredencials.secret;

        return 'Basic ' + new Buffer(credenciais).toString('base64');
    }


};
