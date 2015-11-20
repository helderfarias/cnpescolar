'use strict';

var createHistory = require('history/lib/createBrowserHistory');

var NavigatorHandler = {

    history: function() {
        return createHistory();
    },

    goTo: function(next) {
         return createHistory().replaceState(null, next);
    }

};

module.exports = NavigatorHandler;
