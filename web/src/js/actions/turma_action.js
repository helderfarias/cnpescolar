'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';

export default {

    filtrarPor: function(filtro) {
        Dispatcher.dispatch({
            actionType: Eventos.Turma.LISTAR,
            criterios: filtro
        });
    },

    salvar: function(turma) {
        Dispatcher.dispatch({
            actionType: Eventos.Turma.SALVAR,
            turma: turma
        });
    },

    alterar: function(turma) {
        Dispatcher.dispatch({
            actionType: Eventos.Turma.ALTERAR,
            turma: turma
        });
    },

    excluir: function(turma) {
        Dispatcher.dispatch({
            actionType: Eventos.Turma.EXCLUIR,
            turma: turma
        });
    }

};
