'use strict';

import { createHistory } from 'history';

let NavigatorHandler = {

    goTo: function(next) {
         return createHistory().replaceState(null, next);
    }

};

export default NavigatorHandler;
