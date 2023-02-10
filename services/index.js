process.env.TZ = 'UTC';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var express = require('express');
var app = express();
var cors = require('cors');
var request = require('request');
const sstatic = require('serve-static');

var mysql = require('mysql');

var config = require('./config.json');
if (!config) {
  throw new Error('Configuration is not loaded.');
}

var dbPool = mysql.createPool(config.db);

app.use(cors({ origin: '*' }));

app.use(function (req, res, next) {

  request({
    url: config.services.lvp.path + 'manager/authenticate',
    json: false,
    headers: { 'Authorization': req.headers.authorization }
  }, function (err, resp, body) {
  
    if (!err) {
      console.log(JSON.parse(body));
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader("Access-Control-Allow-Headers", "Authorization, Accept, Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

      req.headers.user = JSON.parse(body).user;
      next();
    } else {
      throw new Error('Unable to authenticated');
    }
  });

});

var routes = require('./router/route')(dbPool);
app.use(sstatic('public'));
app.use(express.json());
app.use('/', routes);

//Create server
var http = require('http').createServer(app);
http.listen(config.port, function () {
  console.log(`Listening for HTTP connections on port: ` + config.port);
});