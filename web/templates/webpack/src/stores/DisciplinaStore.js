'use strict';

import { EventEmitter } from 'events';

let AppDispatcher = require('../sources/AppDispatcher');
let _shoes = {};

// Method to load shoes from action data
function loadShoes(data) {
  _shoes = data.shoes;
}

class ShoeStore extends EventEmitter {

    constructor() {
        super();
    }

    getShoes() {
        return _shoes;
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

}

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case 'GET_DISCIPLINAS':
        loadShoes(action.data);
        break;

        default:
        return true;
    }

    ShoeStore.emitChange();

    return true;
});

module.exports = ShoeStore;
