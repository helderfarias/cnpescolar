'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import DisciplinaService from '../services/disciplina_service';

var service = new DisciplinaService();

let Store = assign({}, EventEmitter.prototype, {

    getDisciplinas() {
        return service.disciplinas;
    },

    getDisciplina(id) {
        return service.obter(id);
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
        case Eventos.Disciplina.LISTAR:
            service.consultar(action.criterios, () => { Store.emitChange(); });
            break;

        case Eventos.Disciplina.SALVAR:
            service.salvar(action.disciplina, () => { Store.emitChange(); });
            break;

        case Eventos.Disciplina.ALTERAR:
            service.alterar(action.disciplina, () => { Store.emitChange(); });
            break;

        case Eventos.Disciplina.EXCLUIR:
            service.excluir(action.disciplina, () => { Store.emitChange(); });
            break;

        default:
            return true;
    }
});

export default Store;
