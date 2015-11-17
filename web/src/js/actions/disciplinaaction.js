var AppDispatcher = require('../dispatcher/appdispatcher');
var AppConstants = require('../constants/appconstants');

var DisciplinaAction = {

    getAll: function(text) {
        AppDispatcher.dispatch({
            actionType: AppConstants.LISTAR_DISCIPLINAS,
            text: text
        });
    }

};

module.exports = DisciplinaAction;
