var AppDispatcher = require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');

var DisciplinaAction = {

    filtrarPor: function(filtro) {
        AppDispatcher.dispatch({
            actionType: AppConstants.LISTAR_DISCIPLINAS,
            filtro: filtro
        });
    },

    salvar: function(disciplina) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SALVAR_DISCIPLINAS,
            disciplina: disciplina
        });
    }

};

module.exports = DisciplinaAction;
