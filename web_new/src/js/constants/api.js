'use strict';

let ApiConfig = {
    Seguranca: {
        auth: function(resource) {
            return 'http://localhost:4001/ges/v1/auth' + resource;
        },
        api: function(resource) {
            return 'http://localhost:4001/ges/v1/api' + resource;
        }
    },
    Cadastro: {
        api: function(resource) {
            return 'http://localhost:4000/ges/v1/api' + resource;
        }
    },
    ClientCredencials: { id: 'clientid', secret: 'clientid00' }
};


export default ApiConfig;
