'use strict';

var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConsts = require('../constants/appconstants');
var ApiConfig = require('../constants/apiconstants');
var assign = require('object-assign');
var request = require('superagent');

var _store = {
    disciplinas: []
};

function consultarDisciplinas(callback) {
    request.get(ApiConfig.url + "/disciplinas")
           .end(function(err, res) {
               if (err != null) {
                   return callback(err);
               }

               _store.disciplinas = res.body;
               callback(err);
            });
}

var DisciplinaStore = assign({}, EventEmitter.prototype, {

    getDisciplinas: function() {
        return _store.disciplinas;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case AppConsts.LISTAR_DISCIPLINAS:
            consultarDisciplinas(function(err) {
                DisciplinaStore.emitChange();
            });
            break;

        default:
    }
});

module.exports = DisciplinaStore;
