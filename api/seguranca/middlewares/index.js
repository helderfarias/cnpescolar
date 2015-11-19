// var corsMiddleware = require('./cors');
// var notfoundMiddleware = require('./notfound');

module.exports = {

    cors: function() {
        return require('./cors');
    },

    notfound: function() {
        return require('./notfound');
    }

};
