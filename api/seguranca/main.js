var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./endpoints/token');
var middlewares = require('./middlewares');
var endpoints = require('./endpoints');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', middlewares.cors());
app.use('/ges/v1', endpoints());
app.use(middlewares.notfound());

app.set('port', process.env.PORT || 4001);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
