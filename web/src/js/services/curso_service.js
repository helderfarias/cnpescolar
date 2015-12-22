'use strict';

import Config from '../constants/api';
import request from 'superagent';

export default class CursoService {

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

    get cursos() {
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

        request.get(Config.Cadastro.api('/cursos'))
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

    salvar(curso, cb) {
        this._erros = [];

        if (curso.nome === '') {
            this._erros = [{
                texto: 'Nome do curso é obrigatório'
            }];

            return cb();
        }

        request.post(Config.Cadastro.api('/cursos'))
                .send(curso)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    }
                    cb();
                }.bind(this));
    }

    alterar(curso, cb) {
        this._erros = [];

        if (curso.nome === '') {
            this._erros = [{
                texto: 'Nome da curso é obrigatório'
            }];

            return cb();
        }

        request.put(Config.Cadastro.api('/cursos/' + curso.id))
                .send(curso)
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    }
                    cb();
                }.bind(this));
    }

    excluir(curso, cb) {
        this._erros = [];

        request.del(Config.Cadastro.api('/cursos/' + curso.id))
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    if (err) {
                        this._erros.push(err);
                    } else {
                        this.remover(curso.id);
                    }
                    cb();
                }.bind(this));
    }

    obterNiveis() {
        return [{id: 1, nome: 'Infantil'}, {id: 2, nome: 'Médio'}];
    }

    _buscarIndice(id) {
        let lista = this._registros || [];

        for (const i in lista) {
            let item = lista[i];

            if (item.id == id) {
                return i;
            }
        }

        return null;
    }


};
