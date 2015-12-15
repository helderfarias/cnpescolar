'use strict';

import Dispatcher from '../dispatcher/appdispatcher';
import Eventos from '../constants/eventos';

export default {

    filtrarPor: function(filtro) {
        Dispatcher.dispatch({
            actionType: Eventos.Disciplina.LISTAR,
            criterios: filtro
        });
    },

    salvar: function(disciplina) {
        Dispatcher.dispatch({
            actionType: Eventos.Disciplina.SALVAR,
            disciplina: disciplina
        });
    },

    alterar: function(disciplina) {
        Dispatcher.dispatch({
            actionType: Eventos.Disciplina.ALTERAR,
            disciplina: disciplina
        });
    },

    excluir: function(disciplina) {
        Dispatcher.dispatch({
            actionType: Eventos.Disciplina.EXCLUIR,
            disciplina: disciplina
        });
    }        

};