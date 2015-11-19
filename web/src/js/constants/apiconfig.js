'use strict';

var ApiConfig = {
    seguranca: {
        auth: function(resource) {
            return 'http://localhost:4001/ges/v1/auth' + resource;
        },
        api: function(resource) {
            return 'http://localhost:4001/ges/v1/api' + resource;
        }
    },
    cadastro: {
        api: function(resource) {
            return 'http://localhost:4000/ges/v1/api' + resource;
        }
    }
}

module.exports = ApiConfig;
