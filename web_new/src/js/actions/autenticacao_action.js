'use strict';

let AutenticacaoAction = {

    loggedIn: function() {
        return !!localStorage.getItem('ges_token');
    }

};

export default AutenticacaoAction;
