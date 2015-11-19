var express = require('express');
var router = express.Router();

require('./token')(router);

module.exports = function() {
    return router;
}
