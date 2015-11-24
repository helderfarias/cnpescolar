'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import request from 'superagent';
import assign from 'object-assign';

var _store = {
    disciplinas: []
};

function consultar(cb) {
    request.get(Config.Cadastro.api('/disciplinas'))
           .end(function(err, res) {
               if (!err) {
                   _store.disciplinas = res.body;
               }
               cb();
            });
}

function cadastrar(entity, cb) {
    request.post(Config.Cadastro.api('/disciplinas'))
           .send(entity)
           .set('Accept', 'application/json')
           .end(function(err, res){
               cb();
           });
}

var DisciplinaStore = assign({}, EventEmitter.prototype, {

    getDisciplinas: function() {
        return _store.disciplinas;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(cb) {
        this.on('change', cb);
    },

    removeChangeListener: function(cb) {
        this.removeListener('change', cb);
    }

});

Dispatcher.register(function(action) {
    switch (action.actionType) {
        case Eventos.Disciplina.LISTAR:
            consultar(function() {
                DisciplinaStore.emitChange();
            });
            break;

        case Eventos.Disciplina.SALVAR:
            cadastrar(action.disciplina, function() {
                DisciplinaStore.emitChange();
            });
            break;

        default:
            return true;
    }
});

export default DisciplinaStore;
