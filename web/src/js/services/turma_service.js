'use strict';

import Config from '../constants/api';
import request from 'superagent';

export default class TurmaService {

    constructor() {
        this._registros = [];
        this._erros = [];
        this._total = 0;
    }

    get total() {
        return this._total;
    }

    get erros() {
        return this._erros;
    }

    get turmas() {
        return this._registros;
    }

    obter(id) {
        let i = this._buscarIndice(id);
        if (i) {
            return this._registros[i];
        }

        return null;
    }

    remover(id) {
        let i = this._buscarIndice(id);
        if (i) {
            delete this._registros[i];
        }
    }

    consultar(criterios, cb) {
        this._erros = [];

        const filtro = criterios || { nome: null, pagina: 1, limite: 10 };

        request.get(Config.Cadastro.api('/turmas'))
                .query({ nome: filtro.nome })
                .query({ pagina: filtro.pagina, limite: filtro.limite })
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    } else {
                        this._registros = res.body;
                        this._total = parseInt(res.headers['x-total-count']);
                    }
                    cb();
                }.bind(this));
    }

    salvar(turma, cb) {
        this._erros = [];

        if (turma.nome === '') {
            this._erros = [{
                texto: 'Nome do turma é obrigatório'
            }];

            return cb();
        }

        request.post(Config.Cadastro.api('/turmas'))
                .send(turma)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    }
                    cb();
                }.bind(this));
    }

    alterar(turma, cb) {
        this._erros = [];

        if (turma.nome === '') {
            this._erros = [{
                texto: 'Nome da turma é obrigatório'
            }];

            return cb();
        }

        request.put(Config.Cadastro.api('/turmas/' + turma.id))
                .send(turma)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    }
                    cb();
                }.bind(this));
    }

    excluir(turma, cb) {
        this._erros = [];

        request.del(Config.Cadastro.api('/turmas/' + turma.id))
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    } else {
                        this.remover(turma.id);
                    }
                    cb();
                }.bind(this));
    }

    _buscarIndice(id) {
        let item = this._registros.filter((i) => { return i.id = id; });

        if (item.length != 0) {
            return item[0];
        }

        return null;
    }


};
