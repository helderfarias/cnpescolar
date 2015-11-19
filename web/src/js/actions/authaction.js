'use strict';

var AuthAction = {

    login: function(email, pass, cb) {
        cb = arguments[arguments.length - 1]

        if (localStorage.token) {
            if (cb) {
                cb(true)
            }
            AuthAction.onChange(true)
            return
        }

        pretendRequest(email, pass, function(res) {
            if (res.authenticated) {
                localStorage.token = res.token;
                if (cb) {
                    cb(true)
                }
                AuthAction.onChange(true);
            } else {
                if (cb) {
                    cb(false)
                }
                AuthAction.onChange(false)
            }
        });
    },

    getToken() {
        return localStorage.token
    },

    logout(cb) {
        delete localStorage.token
        if (cb) {
            cb()
        }

        AuthAction.onChange(false)
    },

    loggedIn() {
        return !!localStorage.token
    },

    requireAuth: function(nextState, replaceState) {
        if ('/login' != nextState.location.pathname) {
            replaceState({ nextPathname: nextState.location.pathname }, '/login');
        }
    },

    onChange() {}
};

function pretendRequest(email, pass, cb) {
    setTimeout(function() {
        if (email === 'admin' && pass === 'admin') {
            cb({ authenticated: true, token: Math.random().toString(36).substring(7) });
        } else {
            cb({ authenticated: false });
        }
    }, 0);
}

module.exports = AuthAction;
