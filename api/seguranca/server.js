var express = require('express');
var logger = require('morgan');
var cors = require('./cors');
var bodyParser = require('body-parser');
var routes = require('./endpoints/token');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.all('*', cors());
app.use('/ges/v1/api', routes)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('port', process.env.PORT || 4001);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
