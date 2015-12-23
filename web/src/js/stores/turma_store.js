'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import TurmaService from '../services/turma_service';

var service = new TurmaService();

let Store = assign({}, EventEmitter.prototype, {

    getTurmas() {
        return service.turmas;
    },

    getTurma(id) {
        return service.obter(id);
    },

    getNiveis() {
        return service.obterNiveis();
    },

    getTotalRegistro() {
        return service.total;
    },

    getErros() {
        return service.erros;
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
        case Eventos.Turma.LISTAR:
            service.consultar(action.criterios, () => { Store.emitChange(); });
            break;

        case Eventos.Turma.SALVAR:
            service.salvar(action.turma, () => { Store.emitChange(); });
            break;

        case Eventos.Turma.ALTERAR:
            service.alterar(action.turma, () => { Store.emitChange(); });
            break;

        case Eventos.Turma.EXCLUIR:
            service.excluir(action.turma, () => { Store.emitChange(); });
            break;

        default:
            return true;
    }
});

export default Store;
