var fs = require('fs');
var jwt = require('jsonwebtoken');

var TokenEndpoint = {

    createToken: function(req, res) {
        var user = TokenEndpoint.getUser(req);
        if (user == null) {
            res.status(401);
            res.json({ "status": 401, "message": "Invalid credentials" });
            return;
        }

        var clientid = TokenEndpoint.getClientCredencials(req);
        if (clientid == null) {
            res.status(401);
            res.json({ "status": 401, "message": "Invalid credentials" });
            return;
        }

        var payload = TokenEndpoint.makePayload(user, clientid);
        var cert = fs.readFileSync(__dirname + '/../certs/ges_pvt.pem');
        var token = jwt.sign(payload, cert, { algorithm: 'RS256'});
        
        jwt.sign(payload, cert, { algorithm: 'RS256' }, function(token) {
            res.json({ token: token })
        });
    },

    makePayload: function(user, clientid) {
        var payload = {
            iss: clientid,
            sub: user.name,
            name: user.name,
            aud: 'http://localhost:4001',
            exp: Date.now() + 10000,
            iat: Date.now(),
            roles: ['role_acesso_sistema']
        };

        return payload;
    },

    getClientCredencials: function(req) {
        if (req.headers.authorization &&
            req.headers.authorization.split(' ').length == 2 &&
            req.headers.authorization.split(' ')[0] === 'Basic' &&
            req.headers.authorization.split(' ')[1] != '') {
            var headers = req.headers.authorization.split(' ')[1];
            var buffer = new Buffer(headers, 'base64');

            var credentials = buffer.toString('ascii');
            if (credentials.split(':').length != 2) {
                return null;
            }

            var clientid = credentials.split(':')[0];
            if (clientid === '') {
                return null;
            }

            return clientid;
        }

        return null;
    },

    getUser: function(req) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        if (username.trim() == '' || password.trim() == '') {
            return null;
        }

        return {
            name: username,
            password: password
        };
    }

};

module.exports = function(router) {

    router.route('/auth/token').post(TokenEndpoint.createToken);

};
