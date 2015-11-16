'use strict';

import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({ source: 'VIEW_ACTION', action: action });
    }

}

let dispatcher  = new AppDispatcher();

export default dispatcher;
