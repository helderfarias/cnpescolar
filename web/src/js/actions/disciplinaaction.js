var AppDispatcher = require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');

var DisciplinaAction = {

    filtrarPor: function(filtro) {
        AppDispatcher.dispatch({
            actionType: AppConstants.LISTAR_DISCIPLINAS,
            filtro: filtro
        });
    }

};

module.exports = DisciplinaAction;
