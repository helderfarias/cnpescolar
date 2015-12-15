'use strict';

export default {

    Seguranca: {
        api: function(resource) {
            return 'http://localhost:4000/ges/v1/api' + resource;
        }
    },

    Cadastro: {
        api: function(resource) {
            return 'http://localhost:4000/ges/v1/api' + resource;
        }
    },

    ClientCredencials: { id: 'clientid', secret: 'clientid00' }

};
