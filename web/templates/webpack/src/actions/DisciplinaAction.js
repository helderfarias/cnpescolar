'use strict';

let AppDispatcher = require('../sources/AppDispatcher');

class DisciplinaAction {

    getDisciplinas(data) {
        AppDispatcher.handleAction({
            actionType: 'GET_DISCIPLINAS',
            data: data
        });
    }

}

let actions = new DisciplinaAction();

export default actions;
