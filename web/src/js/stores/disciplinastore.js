'use strict';

var AppDispatcher = require('../dispatcher/appdispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/appconstants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _disciplinas = [];

var DisciplinaStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _disciplinas;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case AppConstants.LISTAR_DISCIPLINAS:
            _disciplinas.push({'nome': 'Helder'});
            DisciplinaStore.emitChange();
            break;

        default:
    }
});

module.exports = DisciplinaStore;
