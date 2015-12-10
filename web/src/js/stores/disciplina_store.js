'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import request from 'superagent';
import assign from 'object-assign';

var _disciplinas = [];
var _erros = [];
var _total = 0;

function consultar(criterios, cb) {
    _erros = [];

    request.get(Config.Cadastro.api('/disciplinas'))
            .query({ nome: criterios.nome })
            .query({ pagina: criterios.pagina, limite: criterios.limite })
            .end(function(err, res) {
               if (err) {
                   _erros.push(err);
               } else {
                   _disciplinas = res.body;
                   _total = parseInt(res.headers['x-total-count']);
               }

               cb();
            });
}

function salvar(disciplina, cb) {
    _erros = [];

    if (disciplina.nome === '') {
        _erros = [{ texto: 'Nome da disciplina é obrigatório' }];
        cb();
        return;
    }

    request.post(Config.Cadastro.api('/disciplinas'))
           .send(disciplina)
           .set('Accept', 'application/json')
           .end(function(err, res){
               if (err) {
                   _erros.push(err);
               }
               cb();
           });
}

let DisciplinaStore = assign({}, EventEmitter.prototype, {

    getDisciplinas() {
        return _disciplinas;
    },

    getTotalRegistro() {
        return _total;
    },

    getErros() {
        return _erros;
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
        case Eventos.Disciplina.LISTAR:
            consultar(action.criterios, () => {
                DisciplinaStore.emitChange();
            });
            break;

        case Eventos.Disciplina.SALVAR:
            salvar(action.disciplina, function() {
                DisciplinaStore.emitChange();
            });
            break;

        default:
            return true;
    }
});

export default DisciplinaStore;
