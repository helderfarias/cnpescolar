'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';

export default {

    filtrarPor: function(filtro) {
        Dispatcher.dispatch({
            actionType: Eventos.Curso.LISTAR,
            criterios: filtro
        });
    },

    salvar: function(curso) {
        Dispatcher.dispatch({
            actionType: Eventos.Curso.SALVAR,
            curso: curso
        });
    },

    alterar: function(curso) {
        Dispatcher.dispatch({
            actionType: Eventos.Curso.ALTERAR,
            curso: curso
        });
    },

    excluir: function(curso) {
        Dispatcher.dispatch({
            actionType: Eventos.Curso.EXCLUIR,
            curso: curso
        });
    }

};
