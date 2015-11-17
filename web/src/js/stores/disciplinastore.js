'use strict';

var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/appconstants');
var assign = require('object-assign');

var _store = {
    disicplinas: []
};

var DisciplinaStore = assign({}, EventEmitter.prototype, {

    obterTodas: function() {
        return _store.disicplinas;
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
        case AppConstants.LISTAR_DISCIPLINAS:
            _store.disicplinas.push({ id: 1, nome: 'Helder' });
            DisciplinaStore.emitChange();
            break;

        default:
    }
});

module.exports = DisciplinaStore;
