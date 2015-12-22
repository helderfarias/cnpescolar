'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';
import Config from '../constants/api';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import CursoService from '../services/curso_service';

var service = new CursoService();

let Store = assign({}, EventEmitter.prototype, {

    getCursos() {
        return service.cursos;
    },

    getCurso(id) {
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
        case Eventos.Curso.LISTAR:
            service.consultar(action.criterios, () => { Store.emitChange(); });
            break;

        case Eventos.Curso.SALVAR:
            service.salvar(action.curso, () => { Store.emitChange(); });
            break;

        case Eventos.Curso.ALTERAR:
            service.alterar(action.curso, () => { Store.emitChange(); });
            break;

        case Eventos.Curso.EXCLUIR:
            service.excluir(action.curso, () => { Store.emitChange(); });
            break;

        default:
            return true;
    }
});

export default Store;
