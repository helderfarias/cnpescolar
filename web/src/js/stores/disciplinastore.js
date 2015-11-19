'use strict';

var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConsts = require('../constants/appconstants');
var ApiConfig = require('../constants/apiconfig');
var assign = require('object-assign');
var request = require('superagent');

var _store = {
    disciplinas: []
};

function consultar(cb) {
    request.get(ApiConfig.cadastro.api('/disciplinas'))
           .end(function(err, res) {
               if (err != null) {
                   return cb(err);
               }

               _store.disciplinas = res.body;
               cb(err);
            });
}

function cadastrar(entity, cb) {
    request.post(ApiConfig.cadastro.api('/disciplinas'))
           .send(entity)
           .set('Accept', 'application/json')
           .end(function(err, res){
               cb(err);
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

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case AppConsts.LISTAR_DISCIPLINAS:
            consultar(function(err) {
                DisciplinaStore.emitChange();
            });
            break;

        case AppConsts.SALVAR_DISCIPLINAS:
            cadastrar(action.disciplina, function(err) {
                DisciplinaStore.emitChange();
            });
            break;

        default:
            return true;
    }
});

module.exports = DisciplinaStore;
